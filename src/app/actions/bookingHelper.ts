'use server'
import { Appointments, Patients } from '@/utils/databaseTypes'
import { sql } from '@/utils/variables'

type Outcome = {
    success: boolean
    message: string
    data?: Record<string, any> | any
}

export async function registerPatient(patient: Patients) {
    try {
        const result = await sql`
            INSERT INTO public.patients (
                first_name,
                last_name,
                gender,
                email,
                phone_number,
                therapist_id
            ) VALUES (
                '${patient.first_name}',
                '${patient.last_name}',
                '${patient.gender}',
                '${patient.email}',
                '${patient.phone_number}',
                '${patient.therapist_id}'
            ) RETURNING *;`

        return {
            success: true,
            message: 'Patient registered successfully',
            data: result[0]
        } satisfies Outcome
    } catch (error) {
        const msg = 'Unknown error, please try again later'

        return {
            success: false,
            message: 'Failed to register patient',
            data: error instanceof Error ? error.message : msg
        } satisfies Outcome
    }
}

export async function registerAppointment(appointment: Appointments) {
    try {
        const result = await sql`
            INSERT INTO public.appointments (
                type_of_massage,
                scheduled_date,
                notes,
                therapist_id,
                patient_id,
                price,
                duration
            ) VALUES (
                '${appointment.type_of_massage}'::integer,
                '${appointment.scheduled_date}',
                '${appointment.notes}'::varchar(255),
                '${appointment.therapist_id}'::uuid,
                '${appointment.patient_id}'::integer,
                '${appointment.price}'::numeric,
                '${appointment.duration}'::integer
            ) RETURNING *;`

        console.log(result)

        return {
            success: true,
            message: 'Booking initiated successfully',
            data: result[0]
        } satisfies Outcome
    } catch (error) {
        const msg = 'Unknown error, please try again later'

        return {
            success: false,
            message: 'Failed to initiate booking',
            data: error instanceof Error ? error.message : msg
        } satisfies Outcome
    }
}
