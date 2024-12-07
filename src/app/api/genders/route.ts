import { neon } from '@neondatabase/serverless'

import { sql } from '@/utils/variables'

export async function GET() {
    const therapists = await sql`SELECT * FROM genders`
    return Response.json(therapists)
}
