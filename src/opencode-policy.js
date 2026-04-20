import { protect } from "./opencode-policy-rules.js"
import { inject } from "./opencode-policy-rules.js"

/**
 * OpenCode plugin with extensible blocked patterns
 *
 * Usage:
 * Add the package name to the `plugin` array in `opencode.json`
 */
const OpencodePolicy = async () => {
  return {
    "tool.execute.before": async (_input, output) => {
      const path = String(output?.args?.filePath ?? "")
      const rule = protect(path)
      if (rule) {
        throw new Error(rule.reason)
      }
      const values = [
        String(output?.args?.command ?? ""),
        String(output?.args?.text ?? ""),
        String(output?.args?.prompt ?? ""),
        String(output?.args?.query ?? ""),
        path,
      ]
      for (const value of values) {
        const injection = inject(value)
        if (injection) {
          throw new Error(injection.reason)
        }
      }
    },
  }
}

export { OpencodePolicy }
export default OpencodePolicy
