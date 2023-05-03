import "./loadenv.js"
import axios from "axios"
import { Model } from "mozart"

const model = new Model({ model: "gpt-3.5-turbo" })

const message = "Hello!"
console.log("question:", message)

try {
  const answer = await model.use({ message })
  console.log("answer:", answer.content)
} catch (error) {
  if (axios.isAxiosError(error) && error.response) {
    console.log("Error:", error.response.data.error.message) // Error: You exceeded your current quota, please check your plan and billing details.
  }
}
