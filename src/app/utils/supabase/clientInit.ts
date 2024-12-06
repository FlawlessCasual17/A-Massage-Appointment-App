'use server'
import { createClient } from './server'
import { cookies } from 'next/headers'

export async function initSupabaseClient() {
    const cookieStore = cookies()
    return createClient(cookieStore)
}
