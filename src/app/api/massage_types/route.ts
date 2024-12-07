import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.POSTGRES_URL as string)

export async function GET() {
    const massageTypes = await sql`SELECT * FROM massage_types;`
    return Response.json(massageTypes)
}
