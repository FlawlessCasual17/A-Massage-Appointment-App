import { sql } from '@/utils/variables'

export async function GET() {
    const therapists = await sql`SELECT * FROM therapists`
    return Response.json(therapists)
}
