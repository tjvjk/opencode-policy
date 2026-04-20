# opencode-policy

OpenCode plugin with extensible file access policies built on the `tool.execute.before` hook.

The repository ships with one default rule for `.env` files, and new rules can be added in `src/rules.js` without changing the plugin entrypoint.

## What it does today

- `.env`
- `.env.local`
- `.env.production`
- `apps/web/.env`

## Install from GitHub

Add the package in the OpenCode config directory `package.json`:

```json
{
  "dependencies": {
    "opencode-policy": "github:YOUR_GITHUB_NAME/opencode-policy"
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
- `src/rules.js`: file blocking rules
- `test/index.test.js`: smoke tests
- `examples/opencode.json`: example OpenCode config
