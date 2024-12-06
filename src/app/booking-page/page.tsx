'use client'
import { useEffect, useState } from 'react'
import { initSupabaseClient } from '../utils/supabase/clientInit'
import { Card, Button, Select, Avatar } from 'react-daisyui'
import './styles.css'

interface MassageType {
    type_of_massage: number
    name: string
}

interface Therapist {
    id: number
    first_name: string
    last_name: string
    specialties: string[]
    qualification: number
    availability: string | null
}
// TODO: Fix what is causing the data to not be fetched from Supabase.
export default function Page() {
    const [massageTypes, setMassageTypes] = useState<MassageType[]>([])
    const [therapists, setTherapists] = useState<Therapist[]>([])
    const [selectedMassage, setSelectedMassage] = useState<number | null>(null)
    const supabase = initSupabaseClient()

    useEffect(() => {
        !async function() {
            const [massageResponse, therapistResponse] = await Promise.all([
                (await supabase)
                    ?.schema('public')
                    ?.from('massage_types')
                    .select('*'),
                (await supabase)
                    ?.schema('public')
                    ?.from('therapists')
                    .select('*')
            ])
            // Equivalent to their respective "if" statements.
            massageResponse?.data && setMassageTypes(massageResponse.data)
            therapistResponse?.data && setTherapists(therapistResponse.data)
        }() // <- Needed for the Immediately Invoked
            //    Function Expression (IIFE) to work properly.
    }, [supabase])

    return (
        <div className='container mx-auto p-6'>
            <h1 className='text-3xl font-bold mb-8 text-center'>Book Your Massage Session</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {/* Massage Types Section */}
                <div className='space-y-4'>
                    <h2 className='text-2xl font-semibold mb-4'>Select Massage Type</h2>
                    {/* {massageTypes.map(massage => (
                        <Card
                            key={massage.type_of_massage}
                            className={`cursor-pointer hover:shadow-lg transition-shadow ${
                                selectedMassage === massage.type_of_massage ? 'border-primary border-2' : ''
                            }`}
                            onClick={() => setSelectedMassage(massage.type_of_massage)}>
                            <Card.Body>
                                <Card.Title tag='h2'>{massage.name}</Card.Title>
                                <p>{massage.name}</p>
                                <div className='flex justify-between mt-4'>
                                    <span>{massage.duration} minutes</span>
                                    <span className='font-bold'>${massage.price}</span>
                                </div>
                            </Card.Body>
                        </Card>
                    ))} */}
                </div>
                {/* Therapists Section */}
                <div>
                    <h2 className='text-2xl font-semibold mb-4'>Choose Your Therapist</h2>
                    <div className='space-y-4'>
                        {therapists.map(therapist => (
                            <Card key={therapist.id} className='hover:shadow-lg transition-shadow'>
                                <Card.Body>
                                    <div className='flex items-center gap-4'>
                                        <div>
                                            <h3 className='font-bold text-lg'>{therapist.first_name}</h3>
                                            <p className='text-sm'>{therapist.qualification} years experience</p>
                                            <div className='flex flex-wrap gap-2 mt-2'>
                                                {therapist.specialties.map((specialty, index) => (
                                                    <span key={index} className='badge badge-primary badge-outline'>
                                                        {specialty}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
            <div className='mt-8 text-center'>
                <Button color='primary' size='lg' disabled={!selectedMassage}>
                    Continue to Booking
                </Button>
            </div>
        </div>
    )
}
