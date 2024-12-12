'use server'
import { Appointments, Patients } from '@/utils/databaseTypes'
import prisma from '@/utils/prismaClient'
// import prisma from '@/utils/prismaClient'

type Outcome = {
    success: boolean
    message: string
    data?: any
}

export async function registerPatient(patient: Patients) {
    try {
        const result = await prisma.patients.create({
            data: {
                first_name: patient.first_name,
                last_name: patient.last_name,
                gender: patient.gender,
                email: patient.email,
                phone_number: patient.phone_number,
                therapist_id: patient.therapist_id
            }
        })

        return {
            success: true,
            message: 'Patient registered successfully',
            data: result
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
        const result = await prisma.appointments.create({
            data: {
                type_of_massage: appointment.type_of_massage,
                scheduled_date: <string>appointment.scheduled_date,
                notes: appointment.notes,
                therapist_id: appointment.therapist_id,
                patient_id: appointment.patient_id,
                price: appointment.price,
                duration: appointment.duration
            }
        })

        console.log(result)

        return {
            success: true,
            message: 'Booking initiated successfully',
            data: result
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
