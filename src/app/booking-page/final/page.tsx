'use client'
import { registerAppointment, registerPatient } from '@/app/actions/bookingHelper'
import ThemeToggle from '@/app/components/themeToggle'
import icon from '@/assets/icon.svg'
import { Appointments, Genders, MassageType, Patients, Therapists } from '@/utils/databaseTypes'
import { DurationAndPriceType, MassageId, TherapistUuid } from '@/utils/otherTypes'
import dayjs from 'dayjs'
import Image from 'next/image'
import { FormEvent, useEffect, useState } from 'react'
import { Button, Card, Input, Select } from 'react-daisyui'
import '../styles.css'

export default function Page() {
    // Stores selected options by the user.
    const [selectedMassage, setSelectedMassage] = useState<MassageId>(null)
    const [selectedTherapist, setSelectedTherapist] = useState<TherapistUuid>(null)
    const [durationAndPrice, setDurationAndPrice] = useState<DurationAndPriceType>({
        duration: 0,
        price: 0
    })

    // Stores query results from an API request
    const [genders, setGenders] = useState<Genders[]>([])
    const [therapists, setTherapists] = useState<Therapists[]>([])
    const [massageTypes, setMassageTypes] = useState<MassageType[]>([])


    // Contains properties associated with patients.
    const patientElements: Patients = {
        // The default value can be updated based on selection
        first_name: '',
        last_name: '',
        email: '',
        gender: 0,
        phone_number: '',
        therapist_id: selectedTherapist as string
    }

    const [patientData, setPatientData] = useState<Patients>({ ...patientElements })
    const [patientId, setPatientId] = useState(0)

    // Contains properties associated with appointments.
    const appointmentElements: Appointments = {
        // The default value can be updated based on selection
        type_of_massage: selectedMassage as number,
        scheduled_date: '',
        notes: '',
        therapist_id: selectedTherapist as string,
        patient_id: patientId,
        ...durationAndPrice
    }

    // Holds appointment-related data for use in this component.
    const [appointmentData, setAppointmentData] = useState<Appointments>({ ...appointmentElements })

    // Holds the therapist's name for use in the UI.
    const [therapistName, setTherapistName] = useState('')
    // Holds the massage type's name for use in the UI.
    const [massageName, setMassageName] = useState('')

    // Handles the date formatting process.
    const handleDate = (date?: dayjs.ConfigType) =>
        setAppointmentData({
            ...appointmentData,
            scheduled_date: dayjs(date).format('YYYY-MM-DD HH:mm:ss')
        })

    const successAlertIcon = (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            className='stroke-current shrink-0 h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
        </svg>
    )

    // Holds boolean variables for a conditional JSX element.
    const [success, setSuccess] = useState({
        patientResultSuccess: false,
        appointmentResultSuccess: false
    })

    // Used for a conditional JSX element.
    const isBookingSuccessful = success.patientResultSuccess && success.appointmentResultSuccess

    // Handles the final submit.
    async function handleSubmit(event: FormEvent) {
        event.preventDefault()

        if (patientData.therapist_id === null) return

        const patientResult = await registerPatient(patientData)
        const patientResultSuccess = patientResult.success
        if (!patientResultSuccess) {
            console.error(`An error occurred: ${patientResult}`)
            return
        }

        if (appointmentData.therapist_id === null) return

        // Get id of registered patient
        const patientsResponse = await fetch('/api/patients')
        const patients = await patientsResponse.json()
        console.log(patientResult), setPatientId(patients['id'])

        const appointmentResult = await registerAppointment(appointmentData)
        const appointmentResultSuccess = appointmentResult.success
        if (appointmentResultSuccess) {
            console.error(`An error occurred: ${appointmentResult}`)
            return
        }

        console.log(appointmentResult)
        setSuccess({ patientResultSuccess, appointmentResultSuccess })
    }

    // This helps the browser remember which
    // options the user selected.
    useEffect(() => {
        const massageId = localStorage.getItem('selectedMassage') as MassageId | null
        const therapistId = localStorage.getItem('selectedTherapist') as TherapistUuid | null
        const asString = localStorage.getItem('durationAndPrice') as string
        const durationAndPrice = JSON.parse(asString) as DurationAndPriceType | '{"duration":0,"price":0}'

        if (massageId !== null)
            setSelectedMassage(Number(massageId))
        if (therapistId !== null)
            setSelectedTherapist(therapistId)
        if (durationAndPrice !== '{"duration":0,"price":0}')
            setDurationAndPrice(durationAndPrice)

        console.log('Successfully retrieved selected options from localStorage!')
    }, [])

    useEffect(() => {
        if (selectedTherapist) {
            setPatientData(prevData => ({ ...prevData, therapist_id: selectedTherapist }))
            setAppointmentData(prevData => ({ ...prevData, therapist_id: selectedTherapist }))
        }
    }, [selectedTherapist])

    useEffect(() => {
        if (selectedMassage)
            setAppointmentData(prevData => ({ ...prevData, type_of_massage: selectedMassage }))
    }, [selectedMassage])

    useEffect(() => {
        therapists.forEach(therapist => {
            if (therapist.uuid === selectedTherapist)
                setTherapistName(`${therapist.first_name} ${therapist.last_name}`)
        })

        massageTypes.forEach(massageType => {
            if (massageType.id === selectedMassage) setMassageName(massageType.name)
        })
    }, [massageTypes, selectedMassage, selectedTherapist, therapists])

    // Used for fetching and storing the
    // query result in the "genders" array.
    useEffect(() => {
        (async function () {
            try {
                const gResponse = await fetch('/api/genders')
                const tResponse = await fetch('/api/therapists')
                const mResponse = await fetch('/api/massage_types')
                setGenders(await gResponse.json())
                setTherapists(await tResponse.json())
                setMassageTypes(await mResponse.json())
            } catch (error) { console.error(`Fetching error: ${error}`) }
        })()
    }, [])

    return (
        <div className='container mx-auto p-6 lg:max-w-[95%] md:max-w-3xl sm:max-w-3xl'>
            <header className='flex flex-col-reverse'>
                <h1 className='text-3xl font-bold mb-8 text-center'>Finish booking your massage session!</h1>
                <div className='absolute top-1 left-4'>
                    <Image alt='icon' src={icon} width={64} height={64} />
                </div>
                <div className='absolute top-4 right-4'>
                    <ThemeToggle />
                </div>
            </header>
            {/* Left Side */}
            <form onSubmit={handleSubmit} className='form-sty form-control space-y-4 rounded-xl right-80'>
                <div>
                    <label className='block mb-2'>First Name</label>
                    <Input
                        type='text'
                        name='first_name'
                        className='input-styled rounded-xl'
                        value={patientData.first_name || ''}
                        onChange={e => setPatientData({ ...patientData, first_name: e.target.value })}
                    />
                </div>
                <div>
                    <label className='block mb-2'>Last Name/Surname</label>
                    <Input
                        type='text'
                        name='last_name'
                        className='input-styled rounded-xl'
                        value={patientData.last_name || ''}
                        onChange={e => setPatientData({ ...patientData, last_name: e.target.value })}
                    />
                </div>
                <div>
                    <label className='block mb-2'>Gender</label>
                    <Select
                        name='gender'
                        value={patientData.gender || 0}
                        className='input-styled rounded-xl'
                        onChange={e => setPatientData({ ...patientData, gender: Number(e.target.value) })}>
                        <Select.Option disabled>Choose your gender...</Select.Option>
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
                        className='input-styled rounded-xl'
                        value={patientData.email || ''}
                        onChange={e => setPatientData({ ...patientData, email: e.target.value })}
                    />
                </div>
                <div>
                    <label className='block mb-2'>Phone Number</label>
                    <Input
                        type='tel'
                        name='phone_number'
                        placeholder='Format: 000 000 0000'
                        className='input-styled rounded-xl'
                        value={patientData.phone_number || ''}
                        onChange={e => setPatientData({ ...patientData, phone_number: e.target.value })}
                    />
                </div>
                <div>
                    <label className='block mb-2'>Scheduled Date</label>
                    <Input
                        type='datetime-local'
                        name='scheduled_date'
                        className='input-styled rounded-xl /*m-w-[20rem]*/'
                        value={appointmentData.scheduled_date || ''}
                        onChange={e => handleDate(e.target.value)}
                    />
                </div>
                <div>
                    <label className='block mb-2'>Additional Notes</label>
                    <Input
                        type='text'
                        name='notes'
                        className='input-styled rounded-xl'
                        value={appointmentData.notes || ''}
                        onChange={e => setAppointmentData({ ...appointmentData, notes: e.target.value })}
                    />
                </div>
                <Button color='success' type='submit' className='submit'>
                    Book Appointment
                </Button>
            </form>
            {/* Right side */}
            <Card className='other-info form-control space-y-4 rounded-xl left-80 -top-[50rem]'>
                <Card.Body className='text-center'>
                    <Card.Title className='prose-h1:text-xl font-bold mb-4'>
                        Selected Massage Therapist
                    </Card.Title>
                    <p className='prose-p:text-base'>{therapistName}</p>
                </Card.Body>
                <Card.Body className='text-center'>
                    <Card.Title className='prose-h1:text-xl font-bold mb-4'>
                        Selected Massage Type
                    </Card.Title>
                    <p className='prose-p:text-base'>{massageName}</p>
                </Card.Body>
                <Card.Body className='text-center'>
                    <Card.Title className='prose-h1:text-xl font-bold mb-4'>
                        Selected Duration and Price
                    </Card.Title>
                    <p className='prose-p:text-base'>
                        {durationAndPrice.duration} minutes and ${durationAndPrice.price} CAD
                    </p>
                </Card.Body>
            </Card>
            {isBookingSuccessful && (
                <div className='flex flex-col footer-center'>
                    <div role='alert' className='alert alert-success w-[30%] bottom-1 rounded-xl'>
                        {successAlertIcon}
                        <span className='text-white'>
                            You have successfully booked your massage appointment!
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}
