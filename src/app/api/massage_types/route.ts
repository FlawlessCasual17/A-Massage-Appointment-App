import { sql } from '@/utils/variables'

export async function GET() {
    const massageTypes = await sql`SELECT * FROM massage_types`
    return Response.json(massageTypes)
}
