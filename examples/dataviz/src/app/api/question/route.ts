import { Model } from "mozart"

export async function POST(request: Request) {
  console.log("question", request.body)
  // const model = new Model({ model: "gpt-3.5-turbo" })

  // - get the SQL query that corresponds to the question
  // - get the data corresponding to the SQL query
  // - get the charts corresponding to the data

  return new Response(JSON.stringify({ success: true }))
}
