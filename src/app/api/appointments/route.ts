import { sql } from '@/utils/variables'

export async function GET() {
    const massageTypes = await sql`SELECT * FROM appointments`
    return Response.json(massageTypes)
}
