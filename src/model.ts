import {
  OpenAIApi,
  Configuration,
  type ChatCompletionRequestMessage,
} from "openai"

import type { BaseTool } from "./tools"
import { Toolkit } from "./tools/toolkit"

type OpenAIModel = "gpt-3.5-turbo" | "gpt-4"

type Prompt = {
  system?: string
  message?: ChatCompletionRequestMessage
  history?: ChatCompletionRequestMessage[]
}

export class Model {
  prompt: Prompt
  toolkit: Toolkit
  client: OpenAIApi
  model: OpenAIModel
  clientConfig: Record<string, unknown>

  constructor({ model, tools }: { model: OpenAIModel; tools: BaseTool[] }) {
    this.prompt = {}
    this.model = model
    this.toolkit = tools && new Toolkit(tools)

    this.clientConfig = {
      apiKey: process.env.OPENAI_API_KEY,
      organization: process.env.OPENAI_API_ORG_ID,
    }

    const configuration = new Configuration(this.clientConfig)

    this.client = new OpenAIApi(configuration)
  }

  createMessage(role: "system" | "user" | "assistant", content: string) {
    return { role, content }
  }

  createMessages({
    system,
    history,
    message,
  }: {
    system?: string
    message?: string
    history?: ChatCompletionRequestMessage[]
  }): ChatCompletionRequestMessage[] {
    let messages: ChatCompletionRequestMessage[] = []

    if (system) {
      this.prompt.system = system
      if (this.toolkit) {
        this.prompt.system += `\n${this.toolkit.prompt}`
      }
    }
    if (this.prompt.system) {
      messages.push(this.createMessage("system", this.prompt.system))
    }

    if (history) {
      this.prompt.history = history
    }
    if (this.prompt.history) {
      messages = messages.concat(this.prompt.history)
    }

    if (message) {
      messages.push(this.createMessage("user", message))
    }

    return messages
  }

  addToHistory(messages: ChatCompletionRequestMessage[]) {
    if (!this.prompt.history) {
      this.prompt.history = []
    }
    this.prompt.history = this.prompt.history.concat(messages)
  }

  isJson(str = "") {
    try {
      return JSON.parse(str)
    } catch (e) {
      return false
    }
  }

  async use({
    system,
    history,
    message,
  }: {
    system?: string
    message?: string
    history?: ChatCompletionRequestMessage[]
  }): Promise<ChatCompletionRequestMessage | undefined> {
    const messages = this.createMessages({ system, history, message })
    // console.log("Mozart::messages", messages)

    const completion = await this.client.createChatCompletion({
      messages,
      model: this.model,
    })
    // console.log("Mozart::send", completion.config.data)
    // console.log("Mozart::choices", completion.data.choices)

    const answer = completion.data.choices[0].message

    if (message) {
      this.addToHistory([this.createMessage("user", message)])
    }

    if (answer) {
      this.addToHistory([answer])
    }

    if (this.toolkit) {
      const jsonAnswer = this.isJson(answer?.content)

      if (jsonAnswer) {
        const tool = this.toolkit.tools.find(
          (tool) => tool.name === jsonAnswer.tool
        )
        if (tool) {
          jsonAnswer.output = await tool.run(jsonAnswer.input)
          return this.use({ message: JSON.stringify(jsonAnswer) })
        }
      }
    }

    return answer
  }
}
