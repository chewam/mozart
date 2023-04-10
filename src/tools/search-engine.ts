import { BaseTool } from "./base-tool"

const SERPAPI_BASE_URL = "https://serpapi.com"

export class SearchEngine extends BaseTool {
  constructor() {
    const name = "search-engine"
    const description = `
      - SearchEngine:
        - description:
          A tool to run Google search engine queries.
          Useful when you need to find fresh information about any topic.
          It takes a single JSON object as an input and returns a single JSON object as an output
        - input: { "tool": "search-engine", "input": <search query> }
        - ouput: { "tool": "search-engine", "input": <search query>, "output": <Google result for the search query> }
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
    const response = await fetch(url.toString())
    const data = await response.json()

    if (data.error) {
      return `Got error from search engine tool: ${data.error}`
    }

    const answer = this.getAnswer(data)

    return answer
  }
}
