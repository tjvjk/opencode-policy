# opencode-policy

OpenCode plugin with two rule directions:

- blocked patterns
- prompt injections

The repository ships with one blocked pattern for `.env` files and one prompt injection rule for instruction reset attempts.

## What it does today

- `.env`
- `.env.local`
- `.env.production`
- `apps/web/.env`
- `forget all instructions`

## Install locally

Until the package is published to npm, install it as a local OpenCode plugin:

1. Copy `src/opencode-policy.js` to `<your-project>/.opencode/plugins/opencode-policy.js`
2. Copy `src/opencode-policy-rules.js` to `<your-project>/.opencode/plugins/opencode-policy-rules.js`
3. Copy `src/policies/` to `<your-project>/.opencode/plugins/policies/`
4. Restart OpenCode

OpenCode loads project-local plugins automatically from `.opencode/plugins/`, so no `plugin` entry in `opencode.json` is required for this setup.

Use namespaced file names like `opencode-policy.js` instead of generic names like `index.js`. This avoids collisions when multiple local plugins live in the same `.opencode/plugins/` directory.

## Install from npm

After publishing to npm:

```json
{
  "dependencies": {
    "opencode-policy": "^0.1.0"
  }
}
```

Use the same `opencode.json` plugin entry:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["opencode-policy"]
}
```

## Local development

```bash
npm test
```

## Repository layout

- `src/opencode-policy.js`: plugin entrypoint
- `src/opencode-policy-rules.js`: rule loading and matching
- `src/policies/blocked-patterns.json`: blocked patterns
- `src/policies/prompt-injection-patterns.json`: prompt injection patterns
- `test/blocked-patterns.test.js`: blocked pattern tests
- `test/prompt-injections.test.js`: prompt injection tests
- `examples/opencode.json`: example OpenCode config
