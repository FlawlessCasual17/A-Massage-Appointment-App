import prisma from '@/utils/prismaClient'

export async function GET() {
    const therapists = await prisma.$queryRaw`SELECT * FROM public.therapists`
    return Response.json(therapists)
}
