import { BaseTool } from "./base-tool"

export class Calculator extends BaseTool {
  constructor() {
    const name = "calculator"
    const description = `
      - Calculator:
        - description:
          A tool to evaluate a calculation string.
          It takes JSON object as an input and returns a JSON object as an output
        - input: { "tool": "calculator", "input": <the calculation string> }
        - ouput: { "tool": "calculator", "input": <the calculation string>, "output": <the result of the calculation> }
    `
    super({ name, description })
  }

  run(input: string) {
    return eval(input).toString()
  }
}
