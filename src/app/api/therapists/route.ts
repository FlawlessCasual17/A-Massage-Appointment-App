import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.POSTGRES_URL as string)

export async function GET() {
    const therapists = await sql`SELECT * FROM therapists;`
    return Response.json(therapists)
}
