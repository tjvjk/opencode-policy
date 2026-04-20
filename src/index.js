import { rules } from "./rules.js"

/**
 * OpenCode plugin with extensible file access policies
 *
 * Usage:
 * Add the package name to the `plugin` array in `opencode.json`
 */
const OpencodePolicy = async () => {
  return {
    "tool.execute.before": async (_input, output) => {
      const path = String(output?.args?.filePath ?? "")
      const file = path.replaceAll("\\", "/")
      for (const rule of rules) {
        if (rule.match(file)) {
          throw new Error(rule.message)
        }
      }
    },
  }
}

export { OpencodePolicy }
export default OpencodePolicy
