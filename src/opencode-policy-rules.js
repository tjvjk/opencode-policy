import { readFileSync } from "node:fs"

const unsafe = JSON.parse(readFileSync(new URL("./policies/unsafe-tool-patterns.json", import.meta.url), "utf8"))
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

const protect = (file) => match(unsafe, file)
const inject = (text) => match(injections, text)

export { inject, injections, protect, unsafe }
