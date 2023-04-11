"use client"

import { createContext, useContext, useMemo, useState } from "react"

interface QuestionContextValue {
  question: string
  status: "ready" | "loading"
  chart?: Record<string, unknown>
  setQuestion: (question: string) => void
  setStatus: (status: "ready" | "loading") => void
  setChart: (chart: Record<string, unknown>) => void
}

export const QuestionContext = createContext<QuestionContextValue>({
  question: "",
  status: "ready",
  setChart: () => null,
  setStatus: () => null,
  setQuestion: () => null,
})

export function QuestionProvider({ children }: { children: React.ReactNode }) {
  const [question, setQuestion] = useState(
    "What is the number of albums per artist?"
  )
  const [chart, setChart] = useState<Record<string, unknown>>()
  const [status, setStatus] = useState<"ready" | "loading">("ready")

  const contextValue = useMemo(
    () => ({
      chart,
      status,
      question,
      setChart,
      setStatus,
      setQuestion,
    }),
    [chart, status, question, setChart, setStatus, setQuestion]
  )

  return (
    <QuestionContext.Provider value={contextValue}>
      {children}
    </QuestionContext.Provider>
  )
}

export const useQuestion = (): QuestionContextValue =>
  useContext(QuestionContext)
