import { readFileSync } from "node:fs"

const blocked = JSON.parse(readFileSync(new URL("./policies/blocked-patterns.json", import.meta.url), "utf8"))
const injections = JSON.parse(readFileSync(new URL("./policies/prompt-injection-patterns.json", import.meta.url), "utf8"))

const match = (rules, value) => {
  for (const rule of rules) {
    const regex = new RegExp(rule.pattern, rule.flags ?? "i")
    if (regex.test(value)) {
      return rule
    }
  }
  return null
}

const protect = (file) => match(blocked, file.replaceAll("\\", "/"))
const inject = (text) => match(injections, text)

export { blocked, inject, injections, protect }
