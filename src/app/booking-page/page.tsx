'use client'
import SelectedOptions from '@/app/actions/selectedOptions'
import ThemeToggle from '@/app/components/themeToggle'
import icon from '@/assets/icon.svg'
import { MassageType, Therapists } from '@/utils/databaseTypes'
import { MassageId, TherapistUuid } from '@/utils/otherTypes'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button, Card } from 'react-daisyui'
import './styles.css'

export default function Page() {
    const [massageTypes, setMassageTypes] = useState<MassageType[]>([])
    const [therapists, setTherapists] = useState<Therapists[]>([])
    const [selectedMassage, setSelectedMassage] = useState<MassageId>(null)
    const [selectedTherapist, setSelectedTherapist] = useState<TherapistUuid>(null)
    const [durationAndPrice, setDurationAndPrice] = useState({
        duration: 0,
        price: 0
    })

    const options = Array.from({ length: 3 }, (_, i) => ({
        duration: [60, 75, 90][i],
        price: [100, 125, 150][i]
    }))

    function handleSelect(targetValue: string) {
        const arr = targetValue.split('-$')
        const obj = {
            duration: Number(arr[0]),
            price: Number(arr[1])
        }

        console.log(arr)
        console.log(obj)
        setDurationAndPrice({ ...obj })
    }

    const router = useRouter()

    // Function to toggle layout
    function switchLayout() {
        const selectedOptions = new SelectedOptions()
        selectedOptions.set(durationAndPrice, selectedMassage, selectedTherapist)
        console.log(
            'The following data was sent to the final booking page: ',
            durationAndPrice,
            selectedMassage,
            selectedTherapist
        )
        router.push('/booking-page/final')
    }

    useEffect(() => {
        (async function () {
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

    return (
        <div className='container mx-auto p-6 lg:max-w-[95%] md:max-w-3xl sm:max-w-3xl'>
            <div className='flex flex-col-reverse'>
                <div className='absolute top-1 left-4'>
                    <Image
                        alt='icon'
                        className='cursor-pointer'
                        src={icon}
                        width={64}
                        height={64}
                        onClick={() => router.push('..')}
                    />
                </div>
                <h1 className='text-3xl font-bold mb-8 text-center'>Choose your Massage Type and Therapist</h1>
                <div className='absolute top-4 right-4'>
                    <ThemeToggle />
                </div>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-8'>
                {/* Massage Types Section */}
                <div className='space-y-4 flex flex-col items-center'>
                    <h2 className='text-2xl font-semibold mb-4'>Select Massage Type</h2>
                    {massageTypes.map(m => (
                    <Card
                        key={m.id}
                        className={`btn h-[16%] w-3/5 type
                            ${selectedMassage === m.id ? 'chosen' : 'not-chosen'}`}
                        onClick={() => setSelectedMassage(m.id)}>
                        <Card.Body className='flex items-center gap-4 flex-col p-5'>
                            <Card.Title className='text-xl'>{m.name}</Card.Title>
                            <select
                                name='Duration and Price'
                                className='select flex justify-between mt-1.5 max-w-xs bg-slate-600'
                                defaultValue='60-$100.00'
                                onChange={e => handleSelect(e.target.value)}>
                                <option disabled>Please select a price</option>
                                {options.map((opt, idx) => (
                                    <option key={idx} value={`${opt.duration}-$${opt.price}.00`}>
                                        {opt.duration} minutes - ${opt.price}.00
                                    </option>
                                ))}
                            </select>
                        </Card.Body>
                    </Card>
                    ))}
                </div>
                {/* Therapists Section */}
                <div className='space-y-4 flex flex-col items-center'>
                    <h2 className='text-2xl font-semibold mb-4'>Choose Your Therapist</h2>
                    {therapists.map(t => (
                        <Card
                            key={t.uuid}
                            className={`w-3/4 type ${selectedTherapist === t.uuid ? 'chosen' : 'not-chosen'}`}
                            onClick={() => setSelectedTherapist(t.uuid)}>
                            <Card.Body className='flex items-center gap-4 flex-col p-10'>
                                <Card.Title className='font-bold text-lg'>
                                    {t.first_name} {t.last_name}
                                </Card.Title>
                                <p className='text-sm'>{t.email}</p>
                                <p className='text-sm'>{t.phone_number}</p>
                                <p className='text-sm'>{t.qualifications}</p>
                                <div className='flex gap-2 mt-2 flex-wrap-reverse'>
                                    <span className='badge badge-info badge-outline p-5'>
                                        {t.specialties}
                                    </span>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
            <div className='mt-8 text-center'>
                <Button
                    color='ghost'
                    size='lg'
                    disabled={selectedMassage === null || selectedTherapist === null}
                    onClick={switchLayout}>
                    Continue to Booking
                </Button>
            </div>
        </div>
    )
}
