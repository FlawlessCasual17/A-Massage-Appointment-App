// app/actions.ts
'use server'
import prisma from '@/utils/prismaClient'

export const getData = async () => await prisma.$queryRaw`...`
