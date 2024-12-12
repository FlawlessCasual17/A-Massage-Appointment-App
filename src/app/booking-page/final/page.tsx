'use client'
import { registerAppointment, registerPatient } from '@/app/actions/bookingHelper'
import SelectedOptions from '@/app/actions/selectedOptions'
import ThemeToggle from '@/app/components/themeToggle'
import icon from '@/assets/icon.svg'
import { Appointments, Genders, Patients } from '@/utils/databaseTypes'
import dayjs from 'dayjs'
import Image from 'next/image'
import { FormEvent, useEffect, useState } from 'react'
import { Button, Input, Select } from 'react-daisyui'
import '../styles.css'

interface BookingOptions {
    durationAndPrice: DurationAndPriceType
    selectedMassage: MassageId
    selectedTherapist: TherapistUuid
}

export default function Page() {
    const options = new SelectedOptions()
    const selectedMassage = options.selectedMassage
    const selectedTherapist = options.selectedTherapist
    const durationAndPrice = options.durationAndPrice

    const [genders, setGenders] = useState<Genders[]>([])

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

    const appointmentElements: Appointments = {
        // The default value can be updated based on selection
        type_of_massage: selectedMassage as number,
        scheduled_date: '',
        notes: '',
        therapist_id: selectedTherapist as string,
        patient_id: patientId,
        ...durationAndPrice
    }
    const [appointmentData, setAppointmentData] = useState<Appointments>({ ...appointmentElements })

    const handleDate = (date?: dayjs.ConfigType) =>
        setAppointmentData({ ...appointmentData, scheduled_date: dayjs(date).format('YYYY-MM-DD HH:mm:ss') })

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

        // Get id of registered patient
        const patientsResponse = await fetch('/api/patients')
        const patients = await patientsResponse.json()
        console.log(patientResult), setPatientId(patients['id'])
        // console.log(patients as Patients)

        // const appointmentResult = await registerAppointment(appointmentData)
        // const appointmentResultSuccess = appointmentResult.success
        // if (appointmentResultSuccess) {
        //     console.error(`An error occurred: ${appointmentResult}`)
        //     return
        // }
        //
        // console.log(appointmentResult)
        // setRegisterSuccess({ patientResultSuccess, appointmentResultSuccess })
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
            <form onSubmit={handleSubmit} className='final min-w-[35%] space-y-4 flex-wrap rounded-xl'>
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
                        <Select.Option disabled>Please choose a gender</Select.Option>
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
            {isBookingSuccessful &&
                <div className='flex flex-col footer-center'>
                    <div role='alert' className='alert alert-success w-[30%] bottom-1'>
                        {successAlertIcon}
                        <span className='text-white'>You have successfully booked your massage appointment!</span>
                    </div>
                </div>
            }
        </div>
    )
}

export class BookingOptionsManager {
    private options: BookingOptions

    public constructor() {
        this.options = {
            durationAndPrice: { duration: 0, price: 0 },
            selectedMassage: 0,
            selectedTherapist: ''
        }
    }

    // Getters
    getDurationAndPrice(): DurationAndPriceType {
        return { ...this.options.durationAndPrice }
    }

    getSelectedMassage(): MassageId {
        return this.options.selectedMassage
    }

    getSelectedTherapist(): TherapistUuid {
        return this.options.selectedTherapist
    }

    getAllOptions(): BookingOptions {
        return { ...this.options }
    }

    // Setters with validation
    setDurationAndPrice(durationAndPrice: DurationAndPriceType) {
        if (durationAndPrice.duration <= 0) throw new Error('Invalid duration')

        if (durationAndPrice.price <= 0) throw new Error('Invalid price')

        this.options.durationAndPrice = { ...durationAndPrice }
    }

    setSelectedMassage(massageId: MassageId) {
        if (massageId === null || massageId <= 0) throw new Error('Invalid massage selection')

        if (typeof massageId !== 'number') throw new Error('Massage ID must be a number')

        this.options.selectedMassage = massageId
    }

    setSelectedTherapist(therapistUuid: TherapistUuid) {
        if (!therapistUuid || therapistUuid.trim() === '') throw new Error('Invalid therapist selection')

        if (typeof therapistUuid !== 'string') throw new Error('Therapist UUID must be a string')

        this.options.selectedTherapist = therapistUuid
    }

    // Set all options at once with validation
    // setAllOptions(options: BookingOptions) {
    //     if (options.durationAndPrice.duration <= 0)
    //         throw new Error('Invalid duration')

    //     if (options.durationAndPrice.price <= 0)
    //         throw new Error('Invalid price')

    //     if (options.selectedMassage === null || options.selectedMassage <= 0)
    //         throw new Error('Invalid massage selection')

    //     if (!options.selectedTherapist || options.selectedTherapist.trim() === '')
    //         throw new Error('Invalid therapist selection')

    //     if (typeof options.selectedTherapist !== 'string')
    //         throw new Error('Therapist UUID must be a string')

    //     if (typeof options.selectedMassage !== 'number')
    //         throw new Error('Massage ID must be a number')

    //     this.options = { ...options }
    // }

    // Reset to default values
    reset() {
        this.options = {
            durationAndPrice: { duration: 0, price: 0 },
            selectedMassage: 0,
            selectedTherapist: ''
        }
    }
}
