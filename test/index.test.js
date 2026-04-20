import assert from "node:assert/strict"
import test from "node:test"

import OpencodePolicy from "../src/index.js"
import { rules } from "../src/rules.js"

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

test("The rules list does contain at least one file policy", async () => {
  assert.notEqual(rules.length, 0, "The rules list is unexpectedly empty")
})
