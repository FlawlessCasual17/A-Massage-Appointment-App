import prisma from '@/utils/prismaClient'

export async function GET() {
    const massageTypes = await prisma.$queryRaw`SELECT * FROM public.patients`
    return Response.json(massageTypes)
}
