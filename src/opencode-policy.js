import { appendFileSync } from "node:fs"

import { protect } from "./opencode-policy-rules.js"
import { inject } from "./opencode-policy-rules.js"

const preview = (value) => String(value ?? "").slice(0, 200)
const file = new URL("../opencode-policy.log", import.meta.url)

const deny = (reason) => {
  const error = new Error(`Blocked by opencode-policy: ${reason}`)
  error.stack = `Error: Blocked by opencode-policy: ${reason}`
  throw error
}

const record = async (client, level, message, extra) => {
  const body = {
    service: "opencode-policy",
    level,
    message,
    extra,
  }
  appendFileSync(file, `${JSON.stringify({ time: new Date().toISOString(), ...body })}\n`, "utf8")
}

const parts = (part) => {
  return [
    String(part?.text ?? ""),
    String(part?.prompt ?? ""),
    String(part?.command ?? ""),
    String(part?.source?.value ?? ""),
  ]
}

const listed = (list) => {
  return list.flatMap((part) => parts(part))
}

const before = async (client, input, output) => {
  const path = String(output?.args?.filePath ?? "")
  await record(client, "debug", "tool.execute.before", {
    tool: preview(input?.tool),
    filePath: preview(output?.args?.filePath),
    command: preview(output?.args?.command),
    text: preview(output?.args?.text),
    prompt: preview(output?.args?.prompt),
    query: preview(output?.args?.query),
  })
  const rule = protect(path)
  if (rule) {
    await record(client, "warn", "blocked pattern matched", {
      id: preview(rule.id),
      reason: preview(rule.reason),
      filePath: preview(path),
    })
    deny(rule.reason)
  }
  const values = [
    String(input?.tool ?? ""),
    String(output?.args?.text ?? ""),
    String(output?.args?.prompt ?? ""),
    String(output?.args?.query ?? ""),
    String(output?.args?.command ?? ""),
  ]
  await record(client, "debug", "tool.execute.before.scan", {
    tool: preview(input?.tool),
    argsText: preview(output?.args?.text),
    argsPrompt: preview(output?.args?.prompt),
    argsQuery: preview(output?.args?.query),
    argsCommand: preview(output?.args?.command),
  })
  for (const value of values) {
    const injection = inject(value)
    if (injection) {
      await record(client, "warn", "prompt injection matched", {
        id: preview(injection.id),
        reason: preview(injection.reason),
        value: preview(value),
      })
      deny(injection.reason)
    }
  }
}

const message = async (client, input, output) => {
  const values = [
    String(output?.message?.role ?? ""),
    ...listed(Array.isArray(output?.parts) ? output.parts : []),
  ]
  await record(client, "debug", "chat.message", {
    sessionID: preview(input?.sessionID),
    agent: preview(input?.agent),
    model: preview(input?.model?.modelID),
    values: values.map(preview),
  })
  for (const value of values) {
    const injection = inject(value)
    if (injection) {
      await record(client, "warn", "prompt injection matched", {
        id: preview(injection.id),
        reason: preview(injection.reason),
        value: preview(value),
      })
      deny(injection.reason)
    }
  }
}

/**
 * OpenCode plugin with extensible blocked patterns
 *
 * Usage:
 * Add the package name to the `plugin` array in `opencode.json`
 */
export const OpencodePolicy = async ({ client } = {}) => {
  return {
    "chat.message": async (input, output) => message(client, input, output),
    "tool.execute.before": async (input, output) => before(client, input, output),
  }
}
