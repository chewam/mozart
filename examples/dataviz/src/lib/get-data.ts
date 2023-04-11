import pg from "pg"

export default async function getData(
  query: string
): Promise<Array<Record<string, unknown>>> {
  const { Client } = pg

  const client = new Client({
    port: 5432,
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "password",
  })

  client.connect()

  const result = await client.query(query)

  client.end()

  return result.rows
}
