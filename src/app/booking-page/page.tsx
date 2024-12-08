'use client'
import { useEffect, useState } from 'react'
import { Card, Button, Select } from 'react-daisyui'
import Final from './final'
import { MassageType, Therapists } from '@/utils/types'
import './styles.css'

export default function Page() {
    const [massageTypes, setMassageTypes] = useState<MassageType[]>([])
    const [therapists, setTherapists] = useState<Therapists[]>([])
    const [selectedMassage, setSelectedMassage] = useState<number | null>(null)
    const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null)
    const [isFinalLayout, setIsFinalLayout] = useState<boolean>(false)

    const prices = [100, 125, 150]
    const options = Array.from({ length: 3 }, (_, i) => ({
        duration: ['60', '75', '90'][i],
        price: prices[i]
    }))

    // Function to toggle layout
    const toggleLayout = () => setIsFinalLayout(prev => !prev)

    useEffect(() => {
        (async function() {
            try {
                const mResponse = await fetch('/api/massage_types')
                const tResponse = await fetch('/api/therapists')

                setMassageTypes(await mResponse.json())
                setTherapists(await tResponse.json())
            } catch (error) {
                console.error(`Fetching error: ${error}`)
            }
        })()
    }, [])

    {/* Conditional rendering based on the isFinalLayout state */}
    return isFinalLayout ? <Final {...{ selectedMassage, selectedTherapist }} /> : (
        <div className='container mx-auto p-6 transition-all'>
            <h1 className='text-3xl font-bold mb-8 text-center'>
                Book Your Massage Session
            </h1>

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
                    {massageTypes.map(m => (
                        <Card
                            key={m.id}
                            className={`type ${selectedMassage === m.id ? 'choice' : ''}`}
                            onClick={() => setSelectedMassage(m.id)}
                        >
                            <Card.Body>
                                <Card.Title tag='h2'>{m.name}</Card.Title>
                                <p>{m.name}</p>
                                <div className='flex justify-between mt-4'>
                                    <Select key={m.id} className='w-1/3'>
                                        {options.map((opt, idx) =>
                                            <Select.Option key={idx}>
                                                {opt.duration} minutes - ${opt.price}
                                            </Select.Option>
                                        )}
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
                        {therapists.map(t => (
                            <Card
                                key={t.uuid}
                                className={`type ${selectedTherapist === t.uuid ? 'choice' : ''}`}
                                onClick={() => setSelectedTherapist(t.uuid)}
                            >
                                <Card.Body>
                                    <div className="flex items-center gap-4">
                                        <h3 className="font-bold text-lg">
                                            {t.first_name} {t.last_name}
                                        </h3>
                                        <p className="text-sm">{t.email}</p>
                                        <p className="text-sm">{t.phone_number}</p>
                                        <p className="text-sm">{t.qualifications}</p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <span className="badge badge-primary badge-outline">
                                                {t.specialties}
                                            </span>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>
                <div className='mt-8 text-center'>
                    <Button
                        color={!selectedMassage ? 'error' : 'success'}
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
