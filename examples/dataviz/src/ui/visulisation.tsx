"use client"

import Chart from "@/ui/chart"
import { useQuestion } from "@/app/use-question"

const Visualisation = () => {
  const { status, chart } = useQuestion()
  return (
    <div className="visualisation">
      {status === "loading" && <div>Loading...</div>}
      {status === "ready" && !chart && null}
      {status === "ready" && chart && <Chart />}
    </div>
  )
}

export default Visualisation
