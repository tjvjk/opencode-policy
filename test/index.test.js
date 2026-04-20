import assert from "node:assert/strict"
import test from "node:test"

import EnvProtection from "../src/index.js"

test("The plugin cannot allow access to dot env files", async () => {
  const plugin = await EnvProtection()
  await assert.rejects(
    plugin["tool.execute.before"]({}, { args: { filePath: `tmp/token-${Math.random()}/.env.local` } }),
    "The plugin wrongly allows access to dot env files",
  )
})

test("The plugin does not block regular files", async () => {
  const plugin = await EnvProtection()
  await assert.doesNotReject(
    plugin["tool.execute.before"]({}, { args: { filePath: `tmp/plain-${Math.random()}.txt` } }),
    "The plugin wrongly blocks regular files",
  )
})
