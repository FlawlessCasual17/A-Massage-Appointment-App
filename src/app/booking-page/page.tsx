'use client'
import { useEffect, useState } from 'react'
import { Card, Button, Select, Divider } from 'react-daisyui'
import { MassageType, Therapists } from '@/utils/databaseTypes'
import { MassageId, TherapistUuid } from '@/utils/otherTypes'
import './styles.css'
import { useRouter } from 'next/navigation'
import SelectedOptions from '@/app/actions/selectedOptions'

export default function Page() {

    const [massageTypes, setMassageTypes] = useState<MassageType[]>([])
    const [therapists, setTherapists] = useState<Therapists[]>([])
    const [selectedMassage, setSelectedMassage] = useState<MassageId>(null)
    const [selectedTherapist, setSelectedTherapist] = useState<TherapistUuid>(null)

    const prices = [100, 125, 150]
    const options = Array.from({ length: 3 }, (_, i) => ({
        duration: ['60', '75', '90'][i],
        price: prices[i]
    }))

    const router = useRouter()
    // Function to toggle layout
    function switchLayout() {
        const selectedOptions = new SelectedOptions()
        selectedOptions.set(selectedMassage, selectedTherapist)
        router.push('./final')
    }

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
    return (
        <div className='container mx-auto p-6'>
            <h1 className='text-3xl font-bold mb-8 text-center'>
                Choose your Massage Type and Therapist
            </h1>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-8'>
                {/* Massage Types Section */}
                <div className='space-y-4'>
                    <h2 className='text-2xl font-semibold mb-4'>Select Massage Type</h2>
                    {massageTypes.map(m => (
                        <Card
                            key={m.id}
                            className={`type ${selectedMassage === m.id ? 'chosen' : 'not-chosen'}`}
                            onClick={() => setSelectedMassage(m.id)}
                        >
                            <Card.Body className='flex items-center gap-4 flex-col p-10'>
                                <Card.Title className='text-xl'>{m.name}</Card.Title>
                                <div className='flex justify-between mt-4'>
                                    <Select key={m.id} className='w-full max-w-xs'>
                                        {options.map((opt, idx) =>
                                            <Select.Option key={idx}>
                                                {opt.duration} minutes - ${opt.price}
                                            </Select.Option>
                                        )}
                                    </Select>
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
                                className={`type ${selectedTherapist === t.uuid ? 'chosen' : 'not-chosen'}`}
                                onClick={() => setSelectedTherapist(t.uuid)}
                            >
                                <Card.Body className='flex items-center gap-4 flex-col p-10'>
                                    <h3 className='font-bold text-lg'>
                                        {t.first_name} {t.last_name}
                                    </h3>
                                    <p className='text-sm'>{t.email}</p>
                                    <p className='text-sm'>{t.phone_number}</p>
                                    <p className='text-sm'>{t.qualifications}</p>
                                    <div className='flex flex-wrap gap-2 mt-2'>
                                        <span className='badge badge-primary badge-outline'>
                                            {t.specialties}
                                        </span>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
            <div className='mt-8 text-center'>
                <Button
                    size='lg'
                    disabled={selectedMassage === null || selectedTherapist === null}
                    onClick={switchLayout}
                >
                    Continue to Booking
                </Button>
            </div>
        </div>
    )
}
