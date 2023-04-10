import "./loadenv.js"
import { Model } from "mozart"
import { Calculator } from "mozart/dist/tools/index.js"

const model = new Model({
  model: "gpt-3.5-turbo",
  tools: [new Calculator()],
})

const system =
  "A question is going to be submitted to you, do your best to answer it."

const history = [
  {
    role: "user",
    content: "Hello! Can you help me to calculate the following: 2 + 2 ?",
  },
  {
    role: "assistant",
    content: '{ "tool": "calculator", "input": "2 + 2" }',
  },
  {
    role: "user",
    content: '{ "tool": "calculator", "input": "2 + 2", "output": "4" }',
  },
  {
    role: "assistant",
    content: "2 + 2 = 4",
  },
]

const message = "6 * 4"
console.log("question:", message)

const answer = await model.use({ system, history, message })

console.log("answer:", answer.content)
console.log("history:", model.prompt.history)
