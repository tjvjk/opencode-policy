# opencode-policy

OpenCode plugin with two rule sets:

- blocked patterns
- prompt injection patterns

The repository ships with blocked file rules for `.env` paths and prompt injection rules for instruction reset attempts.

## What it does today

- blocks protected file access in `tool.execute.before`
- rewrites matching user prompts in `experimental.chat.messages.transform`
- logs matches to `.opencode/opencode-policy.log`

## Install locally

Install it as a project-local OpenCode plugin:

1. Copy `src/opencode-policy.js` to `<your-project>/.opencode/plugins/opencode-policy.js`
2. Copy `src/opencode-policy-rules.js` to `<your-project>/.opencode/plugins/opencode-policy-rules.js`
3. Copy `src/policies/` to `<your-project>/.opencode/plugins/policies/`
4. Restart OpenCode

OpenCode loads project-local plugins automatically from `.opencode/plugins/`, so no `plugin` entry in `opencode.json` is required for this setup.

Use namespaced file names like `opencode-policy.js` instead of generic names like `index.js`. This avoids collisions when multiple local plugins live in the same `.opencode/plugins/` directory.

## Install from npm

When published, add the package to your OpenCode config:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["opencode-policy"]
}
```

## Local development

```bash
node --test
```

## Repository layout

- `src/opencode-policy.js`: plugin entrypoint
- `src/opencode-policy-rules.js`: rule loading and matching
- `src/policies/blocked-patterns.json`: blocked patterns
- `src/policies/prompt-injection-patterns.json`: prompt injection patterns
- `test/blocked-patterns.test.js`: blocked pattern tests
- `test/prompt-injections.test.js`: prompt injection tests
- `examples/opencode.json`: example npm plugin config
