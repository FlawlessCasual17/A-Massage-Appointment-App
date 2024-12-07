import { neon } from '@neondatabase/serverless';

export const sql = neon(<string>process.env.POSTGRES_URL_NON_POOLING)
