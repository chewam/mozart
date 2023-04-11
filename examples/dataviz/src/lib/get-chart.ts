import { Model } from "mozart"
import type { ChatCompletionRequestMessage } from "openai"

export default async function getChart(
  data: Record<string, unknown>[]
): Promise<Record<string, unknown>> {
  const system = `Your are Vega Chart agent.
The user is going to submit to you a set of data and your role is to return the most appropriate Vega chart implementation to visualize this set of data.
You must return only the code of the Vega chart as a final answer.
Don't add any comment, thought or explanation to the final answer.`

  const history = [
    {
      role: "user",
      content: `[
  { year: 2008-12-31T23:00:00.000Z, num_invoices: '83' },
  { year: 2009-12-31T23:00:00.000Z, num_invoices: '83' },
  { year: 2010-12-31T23:00:00.000Z, num_invoices: '83' },
  { year: 2011-12-31T23:00:00.000Z, num_invoices: '83' },
  { year: 2012-12-31T23:00:00.000Z, num_invoices: '80' }
]`,
    },
    {
      role: "assistant",
      content: `{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "data": {
    "values": [
      { "year": "2008-12-31T23:00:00.000Z", "num_invoices": 83 },
      { "year": "2009-12-31T23:00:00.000Z", "num_invoices": 83 },
      { "year": "2010-12-31T23:00:00.000Z", "num_invoices": 83 },
      { "year": "2011-12-31T23:00:00.000Z", "num_invoices": 83 },
      { "year": "2012-12-31T23:00:00.000Z", "num_invoices": 80 }
    ]
  },
  "mark": "line",
  "encoding": {
    "x": { "field": "year", "type": "temporal" },
    "y": { "field": "num_invoices", "type": "quantitative" }
  }
}`,
    },
    {
      role: "user",
      content: `[
  { Title: '[1997] Black Light Syndrome', num_invoices: '5' },
  {
    Title: '20th Century Masters - The Millennium Collection: The Best of Scorpions',
    num_invoices: '3'
  },
  { Title: 'Ace Of Spades', num_invoices: '5' },
  { Title: 'Achtung Baby', num_invoices: '4' },
  { Title: 'Acústico', num_invoices: '8' },
  { Title: 'Acústico MTV', num_invoices: '9' },
  { Title: 'Acústico MTV [Live]', num_invoices: '4' },
  { Title: 'Adams, John: The Chairman Dances', num_invoices: '1' },
  { Title: 'Afrociberdelia', num_invoices: '5' },
  { Title: 'Album Of The Year', num_invoices: '7' },
]`,
    },
    {
      role: "assistant",
      content: `{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "data": {
    "values": [
      { "Title": "[1997] Black Light Syndrome", "num_invoices": 5 },
      { "Title": "20th Century Masters - The Millennium Collection: The Best of Scorpions", "num_invoices": 3 },
      { "Title": "Ace Of Spades", "num_invoices": 5 },
      { "Title": "Achtung Baby", "num_invoices": 4 },
      { "Title": "Acústico", "num_invoices": 8 },
      { "Title": "Acústico MTV", "num_invoices": 9 },
      { "Title": "Acústico MTV [Live]", "num_invoices": 4 },
      { "Title": "Adams, John: The Chairman Dances", "num_invoices": 1 },
      { "Title": "Afrociberdelia", "num_invoices": 5 },
      { "Title": "Album Of The Year", "num_invoices": 7 }
    ]
  },
  "mark": "bar",
  "encoding": {
    "x": {
      "field": "Title",
      "type": "nominal",
      "sort": "-y",
      "axis": { "labelAngle": -45 }
    },
    "y": { "field": "num_invoices", "type": "quantitative" }
  }
}`,
    },
  ] as ChatCompletionRequestMessage[]

  const model = new Model({ model: "gpt-3.5-turbo" })
  const answer = await model.use({
    system,
    history,
    message: JSON.stringify(data.slice(0, 10)),
  })

  const chart = JSON.parse(answer?.content || "{}")

  return {
    mark: chart.mark,
    encoding: chart.encoding,
  }
}
