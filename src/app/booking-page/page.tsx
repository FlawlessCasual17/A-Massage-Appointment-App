'use client'
import { useEffect, useState } from 'react'
import { Card, Button, Select } from 'react-daisyui'
import Final from './final'
import { Genders, MassageType, Therapists, Patients, Appointments } from '@/utils/types'
import './styles.css'

export default function Page() {
    const [massageTypes, setMassageTypes] = useState<MassageType[]>([])
    const [therapists, setTherapists] = useState<Therapists[]>([])
    const [selectedMassage, setSelectedMassage] = useState<number | null>(null)

    // New state to manage layout switching
    const [isFinalLayout, setIsFinalLayout] = useState<boolean>(false)

    const prices = [100, 125, 150]
    const massageOptions = Array.from({ length: 3 }, (_, i) => ({
        duration: ['60', '75', '90'][i],
        price: prices[i]
    }))

    const [formData, setFormData] = useState<Patients>({
        // The default value can be updated based on selection
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
        gender: 0,
        phone_number: '',
        therapist_id: '',
        appointment_id: 0
    })

    useEffect(() => {
        (async function() {
            try {
                const massageTypesResponse = await fetch('/api/massage_types')
                const therapistsResponse = await fetch('/api/therapists')

                const massageTypes = await massageTypesResponse.json()
                const therapists = await therapistsResponse.json()

                setMassageTypes(massageTypes); setTherapists(therapists)
            } catch (error) {
                console.error(`Fetching error: ${error}`)
            }
        })()
    }, [])

    // Function to toggle layout
    const toggleLayout = () => setIsFinalLayout(prev => !prev)

    {/* Conditional rendering based on the isFinalLayout state */}
    return isFinalLayout ? <Final {...{ formData, setFormData }} /> : (
        <div className='container mx-auto p-6'>
            <h1 className='text-3xl font-bold mb-8 text-center'>Book Your Massage Session</h1>

            {/* Button to toggle layouts */}
            {/* <div className='mb-4 text-center'>
                <Button color='secondary' onClick={toggleLayout}>
                    Switch to {isFinalLayout ? 'Booking' : 'Final'} Layout
                </Button>
            </div> */}

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {/* Massage Types Section */}
                <div className='space-y-4'>
                    <h2 className='text-2xl font-semibold mb-4'>Select Massage Type</h2>
                    {massageTypes.map(massage => (
                        <Card
                            key={massage.id}
                            className={`m-type ${ selectedMassage === massage.id ? 'choice' : '' }`}
                            onClick={() => setSelectedMassage(massage.id)}
                        >
                            <Card.Body>
                                <Card.Title tag='h2'>{massage.name}</Card.Title>
                                <p>{massage.name}</p>
                                <div className='flex justify-between mt-4'>
                                    <Select key={massage.id} className='w-1/3'>
                                        {massageOptions.map((option, index) => <Select.Option key={index}>
                                            {option.duration} minutes - ${option.price}
                                        </Select.Option>)}
                                    </Select>
                                    <span className='font-bold'>
                                        Starting from ${Math.min(...prices)}
                                    </span>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
                {/* Therapists Section */}
                <div>
                    <h2 className='text-2xl font-semibold mb-4'>Choose Your Therapist</h2>
                    <div className='space-y-4'>
                        {therapists.map((therapist, index) => (
                            <Card key={index} className='hover:shadow-lg transition-shadow'>
                                <Card.Body>
                                    <div className='flex items-center gap-4'>
                                        <div>
                                            <h3 className='font-bold text-lg'>{therapist.first_name}</h3>
                                            <p className='text-sm'>{therapist.qualifications} years experience</p>
                                            <div className='flex flex-wrap gap-2 mt-2'>
                                                <span className='badge badge-primary badge-outline'>
                                                    {therapist.specialties}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>
                <div className='mt-8 text-center'>
                    <Button
                        color='primary'
                        size='lg'
                        disabled={!selectedMassage}
                        onClick={toggleLayout}
                    >
                        Continue to Booking
                    </Button>
                </div>
            </div>
        </div>
    )
}
