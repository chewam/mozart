"use client"

import { VegaLite } from "react-vega"
import type { VisualizationSpec } from "react-vega"

import { useQuestion } from "@/app/use-question"

const Chart = () => {
  const { chart } = useQuestion()
  const data = { values: chart?.values }

  const defaultSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    data: { name: "values" },
    mark: "line",
    width: 1000,
    // signals: [
    //   {
    //     name: "width",
    //     init: "containerSize()[0]",
    //     on: [{ events: "window:resize", update: "containerSize()[0]" }],
    //   },
    // ],
    height: 400,
    encoding: {
      x: { field: "year", type: "temporal" },
      y: { field: "num_invoices", type: "quantitative" },
    },
  } as VisualizationSpec

  return (
    <VegaLite spec={{ ...defaultSpec, ...(chart?.spec || {}) }} data={data} />
  )
}

export default Chart
