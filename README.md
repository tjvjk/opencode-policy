# opencode-policy

OpenCode security plugin that blocks risky tool usage before it runs and neutralizes prompt injection attempts before they reach the model.

Use it when you want stronger workspace safety out of the box: it helps prevent secret exposure, exfiltration, unsafe shell execution, reverse shells, denial-of-service commands, cross-workspace access, and common instruction-override attacks.

## What it does

- blocks matching tool arguments in `tool.execute.before`
- rewrites matching user prompts in `experimental.chat.messages.transform`
- logs matches to `.opencode/opencode-policy.log`

## Install from npm

Add it to your OpenCode config:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["opencode-policy"]
}
```

The plugin currently ships with 309 rules across unsafe tool patterns and prompt injection patterns.
