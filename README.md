# mozart

A library to play with OpenAI API.

### Example

```javascript
const calculator = new Calculator() // evals a string and returns the result

const model = new Model({
  model: "gpt-3.5-turbo",
  tools: [calculator],
})

const system = // gives some context
  "A question is going to be submitted to you, do your best to answer it."

const history = [ // trains the model
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

const message = "6 * 4" // a new question

const answer = await model.use({ system, history, message })

console.log(answer.content) // 6 multiplied by 4 equals 24.
```
