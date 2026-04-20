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

## Install from GitHub

Add the package in the OpenCode config directory `package.json`:

```json
{
  "dependencies": {
    "opencode-policy": "github:tjvjk/opencode-policy"
  }
}
```

Then enable it in `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["opencode-policy"]
}
```

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

- `src/index.js`: plugin entrypoint
- `src/policies/blocked-patterns.json`: blocked patterns
- `src/policies/prompt-injection-patterns.json`: prompt injection patterns
- `src/rules.js`: rule loading and matching
- `test/blocked-patterns.test.js`: blocked pattern tests
- `test/prompt-injections.test.js`: prompt injection tests
- `examples/opencode.json`: example OpenCode config
