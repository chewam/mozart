import { BaseTool } from "./base-tool"

const SERPAPI_BASE_URL = "https://serpapi.com"

export class SerpAPI extends BaseTool {
  constructor() {
    const name = "serpapi"
    const description = `
      - SerpAPI:
        - description:
          A search engine. useful for when you need to answer questions about current events. input should be a search query.
          It takes JSON object as an input and returns a JSON object as an output
        - input: { "tool": "serpapi", "input": <search query> }
        - ouput: { "tool": "serpapi", "input": <search query>, "output": <the result of the search query> }
    `
    super({ name, description })
  }

  getUrl(query: string, engine = "google") {
    const url = new URL("search", SERPAPI_BASE_URL)

    url.searchParams.append("q", query)
    url.searchParams.append("engine", engine)
    url.searchParams.append("api_key", process.env.SERPAPI_API_KEY || "")

    return url
  }

  getAnswer(data: {
    answer_box?: {
      answer: string
      snippet: string
      snippet_highlighted_words: string[]
    }
    sports_results?: {
      game_spotlight: string
    }
    knowledge_graph?: {
      description: string
    }
    organic_results?: Array<{
      snippet: string
    }>
  }): string {
    if (data.answer_box?.answer) {
      return data.answer_box.answer
    }
    if (data.answer_box?.snippet) {
      return data.answer_box.snippet
    }
    if (data.answer_box?.snippet_highlighted_words) {
      return data.answer_box.snippet_highlighted_words[0]
    }
    if (data.sports_results?.game_spotlight) {
      return data.sports_results.game_spotlight
    }
    if (data.knowledge_graph?.description) {
      return data.knowledge_graph.description
    }
    if (data.organic_results?.[0]?.snippet) {
      return data.organic_results[0].snippet
    }
    return "No good search result found"
  }

  async run(input: string) {
    const url = this.getUrl(input)
    const response = await fetch(url)
    const data = await response.json()

    if (data.error) {
      return `Got error from serpAPI: ${data.error}`
    }

    return this.getAnswer(data)
  }
}
