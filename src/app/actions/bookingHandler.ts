'use server'
import { Patients } from '@/utils/types'
import { sql } from '@/utils/variables'

export async function bookingHandler(patient: Patients) {
    try {
        const result = await sql`
            INSERT INTO "public"."patients" (
                "first_name",
                "last_name",
                "gender",
                "email",
                "phone_number",
                "therapist_id",
                "appointment_id"
            ) VALUES (
                ${patient.first_name},
                ${patient.last_name},
                ${patient.gender},
                ${patient.email},
                ${patient.phone_number},
                ${patient.therapist_id},
                ${patient.appointment_id}
            ) RETURNING *`

        return {
            success: true,
            message: 'Booking initiated successfully',
            data: result[0]
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
