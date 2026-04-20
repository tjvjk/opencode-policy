# opencode-policy

OpenCode security plugin with 282 unsafe tool patterns, 27 prompt injection patterns, and 309 rules in total.

Use it when you want stronger workspace safety out of the box: it helps prevent secret exposure, exfiltration, unsafe shell execution, reverse shells, denial-of-service commands, cross-workspace access, and common instruction-override attacks. Matching events are logged to `.opencode/opencode-policy.log` for review.

## Install from npm

Add it to your OpenCode config:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["opencode-policy"]
}
```

## License

[MIT](./LICENSE)

## Thanks

Pattern research and source material were adapted in part from [`vakovalskii/topsha`](https://github.com/vakovalskii/topsha)
