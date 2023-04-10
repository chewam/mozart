import type { BaseTool } from "./base-tool"

const TOOLKIT_PREFIX =
  "To help you in this task you can use one of the tools described bellow:"
const TOOLKIT_SUFFIX =
  "When you tend to use a tool, send only the tool's required input as a message."

interface Config {
  prefix: string
  suffix: string
}

export class Toolkit {
  prompt: string
  prefix: string
  suffix: string
  tools: BaseTool[]

  constructor(
    tools: BaseTool[],
    config: Config = { prefix: TOOLKIT_PREFIX, suffix: TOOLKIT_SUFFIX }
  ) {
    this.tools = tools
    this.prefix = config.prefix
    this.suffix = config.suffix
    this.prompt = `${this.prefix}\n\n${tools
      .map((tool) => tool.description)
      .join("\n")}\n\n${this.suffix}`
  }
}
