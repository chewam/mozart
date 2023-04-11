import { Model } from "mozart"
import type { ChatCompletionRequestMessage } from "openai"

import getData from "@/lib/get-data"

export default async function getSQLQuery(message: string): Promise<string> {
  const query = `SELECT table_name, column_name, data_type
  FROM information_schema.columns WHERE table_name IN (
    SELECT c.relname
    FROM pg_class c
    JOIN pg_namespace s ON (c.relnamespace=s.oid)
    WHERE c.relkind = 'r'
    AND s.nspname='public'
  ) ORDER BY table_name, column_name;`

  const data = await getData(query)

  const system = `You are a PostgreSQL agent.
  Your goal is to create the SQL query that would answer the user's question and return this SQL query as a final answer.
  The SQL query should be specific to PostgreSQL query language and all tables and columns must be put between double quotes.

  Here is the description of the PostgreSQL database schema:
  
    \`\`\`sql
    ${query}
    \`\`\`
  
    \`\`\`json
    ${JSON.stringify(data)}
    \`\`\`
  
  The final answer to the user must be a PostgreSQL query only. No comment or thought should be added to this PostgreSQL query.
  `

  const history = [
    {
      role: "user",
      content:
        "Hello! Can you help me to find the SQL query that answers this question: How many tracks are there?",
    },
    {
      role: "assistant",
      content: 'SELECT COUNT(*) FROM "Tracks"',
    },
    {
      role: "user",
      content: "What is the average number of tracks per album?",
    },
    {
      role: "assistant",
      content:
        'SELECT AVG(num_tracks) FROM (SELECT COUNT(*) AS num_tracks FROM "Track" GROUP BY "AlbumId") AS album_tracks',
    },
    {
      role: "user",
      content: "What is the list of albums and their number of tracks?",
    },
    {
      role: "assistant",
      content:
        'SELECT "Album"."Title", COUNT(*) AS num_tracks FROM "Album" JOIN "Track" ON "Album"."AlbumId" = "Track"."AlbumId" GROUP BY "Album"."Title"',
    },
  ] as ChatCompletionRequestMessage[]

  const model = new Model({ model: "gpt-3.5-turbo" })
  const answer = await model.use({ system, history, message })

  return answer?.content || ""
}
