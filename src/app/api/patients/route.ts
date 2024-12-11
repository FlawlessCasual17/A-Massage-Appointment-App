import { sql } from '@/utils/variables'

export async function GET() {
    const massageTypes = await sql`SELECT * FROM public.patients`
    return Response.json(massageTypes)
}
