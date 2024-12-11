import { neon } from '@neondatabase/serverless';

export const sql = neon(<string>process.env.DATABASE_URL)
