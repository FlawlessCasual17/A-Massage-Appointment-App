import { sql } from '@/utils/variables'

export async function GET() {
    const massageTypes = await sql`SELECT * FROM public.appointments`
    return Response.json(massageTypes)
}
