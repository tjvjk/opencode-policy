/**
 * OpenCode plugin that forbids access to `.env` files
 *
 * Usage:
 * Add the package name to the `plugin` array in `opencode.json`
 */
const EnvProtection = async () => {
  return {
    "tool.execute.before": async (_input, output) => {
      const path = String(output?.args?.filePath ?? "")
      const file = path.replaceAll("\\", "/")
      if (/(^|\/)\.env(\..+)?$/.test(file)) {
        throw new Error("Access to .env files is forbidden")
      }
    },
  }
}

export { EnvProtection }
export default EnvProtection
