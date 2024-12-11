import { sql } from '@/utils/variables'

export async function GET() {
    const therapists = await sql`SELECT * FROM public.genders`
    return Response.json(therapists)
}
