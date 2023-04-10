import "./loadenv.js"
import pg from "pg"
import { Model } from "mozart"

const { Client } = pg

const client = new Client({
  port: 5432,
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "password",
})

client.connect()

const query = `SELECT table_name, column_name, data_type
FROM information_schema.columns WHERE table_name IN (
  SELECT c.relname
  FROM pg_class c
  JOIN pg_namespace s ON (c.relnamespace=s.oid)
  WHERE c.relkind = 'r'
  AND s.nspname='public'
) ORDER BY table_name, column_name;`

const result = await client.query(query)

client.end()

const model = new Model({ model: "gpt-3.5-turbo" })

const system = `You are a SQL agent.
Your goal is to create the SQL query that would answer the user's question and return this SQL query as a final answer.
Here is the description of the SQL database schema:

  \`\`\`sql
  ${query}
  \`\`\`

  \`\`\`json
  ${JSON.stringify(result.rows)}
  \`\`\`

The final answer to the user must be a SQL query only. No comment or thought should be added to this SQL query.
`

const history = [
  {
    role: "user",
    content:
      "Hello! Can you help me to find the SQL query that answers this question: How many tracks are there?",
  },
  {
    role: "assistant",
    content: "SELECT COUNT(*) FROM 'Tracks'",
  },
  {
    role: "user",
    content: "What is the average number of tracks per album?",
  },
  {
    role: "assistant",
    content:
      "SELECT AVG(num_tracks) FROM (SELECT COUNT(*) as num_tracks FROM Track GROUP BY AlbumId) as album_tracks",
  },
]

const message = "What is the list of albums and their number of tracks?"

const answer = await model.use({ system, history, message })

console.log("answer:", answer.content)
console.log("history:", model.prompt.history)
