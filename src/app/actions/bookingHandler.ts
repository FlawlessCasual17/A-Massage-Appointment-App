'use server'
import { createClient, SupabaseClientOptions } from '@supabase/supabase-js'
import { Database, TablesInsert } from '../../../database.types'

// Create a Supabase config object
const supabaseConfig = {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    options: {
        auth: {
            persistSession: true
        },
        db: { schema: 'public' }
    } as SupabaseClientOptions<any>
}

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(
    supabaseConfig.supabaseUrl,
    supabaseConfig.supabaseKey,
    supabaseConfig.options
)

// type database = Database['public']['Tables']['patients']['Insert']

// A function to handle the booking process
export async function bookingHandler(patientData: TablesInsert<'patients'>) {
    try {
        const { data, error } = await supabase
            .from('patients').insert([patientData]).select()

        if (error != null) throw error

        return {
            success: true,
            message: 'Booking initiated successfully',
            data
        }
    } catch (error) {
        const msg = 'Unknown error, please try again later'

        return {
            success: false,
            message: 'Failed to initiate booking',
            error: error instanceof Error ? error.message : msg
        }
    }
}
