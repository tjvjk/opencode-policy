# opencode-env-protection

OpenCode plugin that blocks access to `.env` files through the `tool.execute.before` hook.

## What it blocks

- `.env`
- `.env.local`
- `.env.production`
- `apps/web/.env`

## Install from GitHub

Add the package in the OpenCode config directory `package.json`:

```json
{
  "dependencies": {
    "opencode-env-protection": "github:YOUR_GITHUB_NAME/opencode-env-protection"
  }
}
```

Then enable it in `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["opencode-env-protection"]
}
```

## Install from npm

After publishing to npm:

```json
{
  "dependencies": {
    "opencode-env-protection": "^0.1.0"
  }
}
```

Use the same `opencode.json` plugin entry:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["opencode-env-protection"]
}
```

## Local development

```bash
npm test
```

## Repository layout

- `src/index.js`: plugin entrypoint
- `test/index.test.js`: smoke tests
- `examples/opencode.json`: example OpenCode config
