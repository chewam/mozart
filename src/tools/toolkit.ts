import type { BaseTool } from "./base-tool"

const TOOLKIT_PREFIX = "You must use the tools described bellow:"
const TOOLKIT_SUFFIX = `Use the provided tools as many times as you need to find the final answer to the question.
When you use a tool, send only the tool's required input as a message, don't send any extra text before or after the tool's required input.
Give the provided tools a try before considering that they cannot be helpful.
Don't ask the permission to the user to use the tools, don't ask the user if using the tools a certain way would be a good idea or not. Just use the tools the way you think it is correct until you get the final answer. If you consider that the provided tools are not helping, give a reason.
`

export interface ToolkitConfig {
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
    config: ToolkitConfig = { prefix: TOOLKIT_PREFIX, suffix: TOOLKIT_SUFFIX }
  ) {
    this.tools = tools
    this.prefix = config.prefix
    this.suffix = config.suffix
    this.prompt = `${this.prefix}\n\n${tools
      .map((tool) => tool.description)
      .join("\n")}\n\n${this.suffix}`
  }
}
