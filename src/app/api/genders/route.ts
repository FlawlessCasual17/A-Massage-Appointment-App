import prisma from '@/utils/prismaClient'

export async function GET() {
    const therapists = await prisma.$queryRaw`SELECT * FROM public.genders`
    return Response.json(therapists)
}
