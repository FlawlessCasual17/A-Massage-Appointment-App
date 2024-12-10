'use client'
import { registerAppointment, registerPatient } from '@/app/actions/bookingHelper'
import SelectedOptions from '@/app/actions/selectedOptions'
import { Appointments, Genders, Patients } from '@/utils/databaseTypes'
// import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import { FormEvent, useEffect, useState } from 'react'
import { Alert, Button, Input, Select } from 'react-daisyui'
import '../styles.css'

export default function Page() {
    const options = new SelectedOptions()
    const selectedMassage = options.selectedMassage
    const selectedTherapist = options.selectedTherapist
    const durationAndPrice = options.durationAndPrice

    const [genders, setGenders] = useState<Genders[]>([])

    const patientElements: Patients = {
        // The default value can be updated based on selection
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
        gender: 0,
        phone_number: '',
        therapist_id: selectedTherapist as string
    }
    const [patientData, setPatientData] = useState<Patients>({ ...patientElements })

    const [patientId, setPatientId] = useState(0)

    const appointmentElements: Appointments = {
        // The default value can be updated based on selection
        id: 0,
        type_of_massage: selectedMassage as number,
        scheduled_date: '',
        notes: '',
        therapist_id: selectedTherapist as string,
        patient_id: patientId,
        ...durationAndPrice
    }
    const [appointmentData, setAppointmentData] = useState<Appointments>({ ...appointmentElements })

    const handleDate = (date?: dayjs.ConfigType) => dayjs(date).format('YYYY-MM-DD HH:mm:ss')

    const successAlertIcon = (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            className='stroke-current shrink-0 h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
        </svg>
    )

    const [registerSuccess, setRegisterSuccess] = useState({
        patientResultSuccess: false,
        appointmentResultSuccess: false
    })

    const isBookingSuccessful = registerSuccess.patientResultSuccess && registerSuccess.appointmentResultSuccess

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()

        const patientResult = await registerPatient(patientData)
        const patientResultSuccess = patientResult.success
        if (patientResultSuccess) {
            console.error(`An error occurred: ${patientResult}`)
            return
        }

        const appointmentResult = await registerAppointment(appointmentData)
        const appointmentResultSuccess = appointmentResult.success
        if (appointmentResultSuccess) {
            console.error(`An error occurred: ${appointmentResult}`)
            return
        }

        console.log(patientResult), setPatientId(patientData.id)

        console.log(appointmentResult)
        setRegisterSuccess({ patientResultSuccess, appointmentResultSuccess })
    }

    useEffect(() => {
        (async function () {
            try {
                const gendersResponse = await fetch('/api/genders')
                setGenders(await gendersResponse.json())
            } catch (error) {
                console.error(`Fetching error: ${error}`)
            }
        })()
    }, [])

    // TODO: Finish styling everything in the page.
    return (
        <div className='container mx-auto p-6'>
            {/* Left Side */}
            <h1 className='text-3xl font-bold mb-8 text-center'>Finish booking your massage session!</h1>
            <form onSubmit={handleSubmit} className='final space-y-4 rounded-xl'>
                <div>
                    <label className='block mb-2'>First Name</label>
                    <Input
                        type='text'
                        name='first_name'
                        value={patientData.first_name || ''}
                        onChange={e => setPatientData({ ...patientData, first_name: e.target.value })}
                        className='option rounded-xl'
                    />
                </div>
                <div>
                    <label className='block mb-2'>Last Name/Surname</label>
                    <Input
                        type='text'
                        name='last_name'
                        value={patientData.last_name || ''}
                        onChange={e => setPatientData({ ...patientData, last_name: e.target.value })}
                        className='option rounded-xl'
                    />
                </div>
                <div>
                    <label className='block mb-2'>Gender</label>
                    <Select
                        name='gender'
                        value={patientData.gender || 0}
                        className='option rounded-xl'
                        onChange={e => setPatientData({ ...patientData, gender: Number(e.target.value) })}>
                        {genders.map(gender => (
                            <Select.Option key={gender.id} value={gender.id}>
                                {gender.type}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
                <div>
                    <label className='block mb-2'>Email</label>
                    <Input
                        type='email'
                        name='email'
                        value={patientData.email || ''}
                        onChange={e => setPatientData({ ...patientData, email: e.target.value })}
                        className='option rounded-xl'
                    />
                </div>
                <div>
                    <label className='block mb-2'>Phone Number</label>
                    <Input
                        type='tel'
                        name='phone_number'
                        value={patientData.phone_number || ''}
                        onChange={e => setPatientData({ ...patientData, phone_number: e.target.value })}
                        className='option rounded-xl'
                    />
                </div>
                <div>
                    <label className='block mb-2'>Scheduled Date</label>
                    <Input
                        type='datetime-local'
                        name='scheduled_date'
                        value={appointmentData.scheduled_date || ''}
                        onChange={e =>
                            setAppointmentData({
                                ...appointmentData,
                                scheduled_date: handleDate(e.target.value)
                            })
                        }
                        className='option rounded-xl'
                    />
                </div>
                <div>
                    <label className='block mb-2'>Additional Notes</label>
                    <Input
                        type='text'
                        name='notes'
                        value={appointmentData.notes || ''}
                        onChange={e => setAppointmentData({ ...appointmentData, notes: e.target.value })}
                        className='option rounded-xl'
                    />
                </div>
                <Button type='submit' className='submit'>
                    Book Appointment
                </Button>
            </form>
            {isBookingSuccessful && (
                <Alert status='success' icon={successAlertIcon}>
                    <span>You have successfully booked your massage appointment!</span>
                </Alert>
            )}
        </div>
    )
}
