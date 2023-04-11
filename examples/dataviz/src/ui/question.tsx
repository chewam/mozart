"use client"

import type { FormEvent } from "react"

import { useQuestion } from "@/app/use-question"

export default function Question() {
  const { question, setQuestion, setStatus, setChart } = useQuestion()

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus("loading")
    try {
      const response = await fetch("/api/question", {
        method: "POST",
        body: JSON.stringify({ question }),
      })

      const data = await response.json()
      setChart(data)
    } catch (error) {
      console.log("ERROR:", error)
    }
    setStatus("ready")
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        value={question}
        style={{ width: "600px" }}
        onChange={({ target: { value } }) => setQuestion(value)}
      />
      <button>submit</button>
    </form>
  )
}
