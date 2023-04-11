import getData from "@/lib/get-data"
import getChart from "@/lib/get-chart"
import getSQLQuery from "@/lib/get-sql-query"

export async function POST(request: Request) {
  const { question: message } = await request.json()

  // - get the SQL query that corresponds to the question
  const SQLQuery = await getSQLQuery(message)
  console.log("query:", SQLQuery)

  // - get the data corresponding to the SQL query
  const data = await getData(SQLQuery)
  console.log("data:", data)

  // - get the charts corresponding to the data
  const chart = await getChart(data)
  console.log("chart:", chart)

  return new Response(JSON.stringify({ spec: chart, values: data }))
}
