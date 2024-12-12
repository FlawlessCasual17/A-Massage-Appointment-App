import { neonConfig, Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import dotenv from '@dotenvx/dotenvx'
import ws from 'ws'

dotenv.config()
neonConfig.webSocketConstructor = ws
neonConfig.poolQueryViaFetch = true
const connectionString = <string>process.env.DATABASE_URL

// Type definitions
declare global {
    // noinspection ES6ConvertVarToLetConst, JSUnusedGlobalSymbols
    var prisma: PrismaClient | undefined
}

const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)
const prisma = new PrismaClient({ adapter })

if (process.env.NODE_ENV === 'development') global.prisma = prisma

export default prisma
