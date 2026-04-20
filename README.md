# opencode-policy

OpenCode plugin with two rule sets:

- blocked patterns (282)
- prompt injection patterns (27)

Total rules: 309

The repository ships with blocked command and path rules for secret access, exfiltration, unsafe execution, reverse shells, denial of service, and cross-workspace access, plus prompt injection rules for instruction overrides, fake role tags, jailbreak phrases, prompt extraction, and encoded payloads.

## What it does today

- blocks matching tool arguments in `tool.execute.before`
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

Blocked-pattern coverage lives in `test/blocked-patterns.test.js` and covers every rule in `src/policies/blocked-patterns.json`.

Prompt injection coverage lives in `test/prompt-injections.test.js` and includes the rules from `src/policies/prompt-injection-patterns.json`.

## Repository layout

- `src/opencode-policy.js`: plugin entrypoint
- `src/opencode-policy-rules.js`: rule loading and matching
- `src/policies/blocked-patterns.json`: blocked patterns
- `src/policies/prompt-injection-patterns.json`: prompt injection patterns
- `test/blocked-patterns.test.js`: blocked pattern tests
- `test/prompt-injections.test.js`: prompt injection tests
- `examples/opencode.json`: example npm plugin config
