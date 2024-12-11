import { sql } from '@/utils/variables'

export async function GET() {
    const therapists = await sql`SELECT * FROM public.therapists`
    return Response.json(therapists)
}
