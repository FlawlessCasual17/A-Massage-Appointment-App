// app/actions.ts
'use server'
import { sql } from '@/utils/variables'

export const getData = async () => await sql`...`
