const rules = [
  {
    match(file) {
      return /(^|\/)\.env(\..+)?$/.test(file)
    },
    message: "Access to protected files is forbidden",
  },
]

export { rules }
