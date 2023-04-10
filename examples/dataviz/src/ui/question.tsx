"use client"

import { FormEvent, useState } from "react"

export default function Question() {
  const [value, setValue] = useState("")

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const response = await fetch("/api/question", {
      body: value,
      method: "POST",
    })
    const data = await response.json()
    console.log("data", data)
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        value={value}
        onChange={({ target: { value } }) => setValue(value)}
      />
      <button>submit</button>
    </form>
  )
}
