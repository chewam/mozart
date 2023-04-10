import "./loadenv.js"
import { Model } from "mozart"
import { SearchEngine } from "mozart/dist/tools/index.js"

const model = new Model({
  model: "gpt-3.5-turbo",
  tools: [new SearchEngine()],
})

const system =
  "A question is going to be submitted to you, do your best to answer it."

const history = [
  {
    role: "user",
    content:
      "Hello! Can you help me answering this question: What is the 100m world record?",
  },
  {
    role: "assistant",
    content: '{ "tool": "search-engine", "input": "100m world record" }',
  },
  {
    role: "user",
    content:
      '{ "tool":"search-engine", "input":"100m world record", "output":"The current men\'s world record is 9.58 seconds, set by Jamaica\'s Usain Bolt in 2009, while the women\'s world record of 10.49 seconds set by American ..." }',
  },
  {
    role: "assistant",
    content:
      "The current 100m world record for men is 9.58 seconds, set by Jamaica's Usain Bolt in 2009.",
  },
  {
    role: "user",
    content: "How old are Bruce Willis and Madona?",
  },
  {
    role: "assistant",
    content: '{ "tool": "search-engine", "input": "age of Bruce Willis" }',
  },
  {
    role: "user",
    content:
      '{ "tool": "search-engine", "input": "age of Bruce Willis", "output": "68 years" }',
  },
  {
    role: "assistant",
    content: '{ "tool": "search-engine", "input": "age of Madona" }',
  },
  {
    role: "user",
    content:
      '{ "tool": "search-engine", "input": "age of Madona", "output": "64 years" }',
  },
  {
    role: "assistant",
    content: "Bruce Willis is 68 years old and Madona is 64 years old.",
  },
]

const message = "What is the highest mountain in the world and in Europe?"
console.log("question:", message)

const answer = await model.use({ system, history, message })

console.log("answer:", answer.content)
console.log("history:", model.prompt.history)
