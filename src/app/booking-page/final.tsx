'use client'
import { FormEvent, useEffect, useState } from 'react'
import { Button, Input, Select } from 'react-daisyui'
import { Appointments, Genders, Patients } from '@/utils/types'
import { bookingHandler } from '../actions/bookingHandler'
import './styles.css'

type SelectedData = {
    selectedMassage: number | null
    selectedTherapist: string | null
}

export default function Final({ selectedMassage, selectedTherapist }: SelectedData) {
    const patientElements: Patients = {
        // The default value can be updated based on selection
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
        gender: 0,
        phone_number: '',
        therapist_id: '',
        appointment_id: 0
    }

    const appointmentElements: Appointments = {
        id: 0,
        type_of_massage: 0,
        scheduled_date: '',
        notes: '',
        therapist_id: '',
        patient_id: 0
    }

    const [genders, setGenders] = useState<Genders[]>([])
    const [patientData, setPatientData] = useState<Patients>({ ...patientElements })
    const [appointmentData, setAppointmentData] = useState<Appointments>({ ...appointmentElements })

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        const result = await bookingHandler(patientData)
        if (result.success) {
            // Handle success (e.g., show a success message, redirect)
            console.log(result)
        } else {
            // Handle error (e.g., show error message)
            console.error(`An error occurred: ${result}`)
        }
    }

    useEffect(() => {
        (async function() {
            try {
                const gendersResponse = await fetch('/api/genders')
                setGenders(await gendersResponse.json())
            } catch (error) {
                console.error(`Fetching error: ${error}`)
            }
        })()
    }, [])

    return (
        <div className='final rounded-lg transition-all'>
            <h1 className='text-2xl font-bold mb-6'>Finish booking your massage session!</h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label className='block mb-2'>First Name</label>
                    <Input
                        type='text'
                        value={patientData.first_name || ''}
                        onChange={e => setPatientData({ ...patientData, first_name: e.target.value })}
                        className='option rounded-xl'
                    />
                </div>
                <div>
                    <label className='block mb-2'>Last Name/Surname</label>
                    <Input
                        type='text'
                        value={patientData.last_name || ''}
                        onChange={e => setPatientData({ ...patientData, last_name: e.target.value })}
                        className='option rounded-xl'
                    />
                </div>
                <div>
                    <label className="block mb-2">Choose your Gender</label>
                    <Select
                        value={ patientData.gender || 0 }
                        className="option rounded-xl"
                        onChange={e => setPatientData({ ...patientData, gender: Number(e.target.value) })}
                    >
                        {genders.map(gender =>
                            <Select.Option key={gender.id} value={gender.id}>
                                {gender.type}
                            </Select.Option>
                        )}
                    </Select>
                </div>
                <div>
                    <label className='block mb-2'>Email</label>
                    <Input
                        type='email'
                        value={patientData.email || ''}
                        onChange={e => setPatientData({ ...patientData, email: e.target.value })}
                        className='option rounded-xl'
                    />
                </div>
                <div>
                    <label className='block mb-2'>Phone Number</label>
                    <Input
                        type='tel'
                        value={patientData.phone_number || ''}
                        onChange={e => setPatientData({ ...patientData, phone_number: e.target.value })}
                        className='option rounded-xl'
                    />
                </div>
                <Button type='submit' className='submit'>
                    Book Appointment
                </Button>
            </form>
        </div>
    )
}
