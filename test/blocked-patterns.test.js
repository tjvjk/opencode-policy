import assert from "node:assert/strict"
import test from "node:test"

import { OpencodePolicy } from "../src/opencode-policy.js"
import { blocked, protect } from "../src/opencode-policy-rules.js"

test("The plugin cannot block access to protected files late", async () => {
  const plugin = await OpencodePolicy()
  await assert.rejects(
    plugin["tool.execute.before"]({}, { args: { filePath: `tmp/token-${Math.random()}/.env.local` } }),
    "The plugin wrongly allows access to protected files",
  )
})

test("The plugin does not block regular files", async () => {
  const plugin = await OpencodePolicy()
  await assert.doesNotReject(
    plugin["tool.execute.before"]({}, { args: { filePath: `tmp/plain-${Math.random()}.txt` } }),
    "The plugin wrongly blocks regular files",
  )
})

test("The blocked patterns list does contain at least one rule", async () => {
  assert.notEqual(blocked.length, 0, "The blocked patterns list is unexpectedly empty")
})

test("The blocked matcher does detect dot env files", async () => {
  assert.notEqual(protect(`tmp/token-${Math.random()}/.env`), null, "The blocked matcher unexpectedly misses dot env files")
})
