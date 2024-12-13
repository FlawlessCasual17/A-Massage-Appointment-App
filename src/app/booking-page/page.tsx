'use client'
import ThemeToggle from '@/app/components/themeToggle'
import icon from '@/assets/icon.svg'
import { MassageType, Therapists } from '@/utils/databaseTypes'
import { DurationAndPriceType, MassageId, TherapistUuid } from '@/utils/otherTypes'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { Button, Card } from 'react-daisyui'
import './styles.css'

export default function Page() {
    const router = useRouter() // Used for page swapping.

    // Holds the data from API requests to the database.
    const [massageTypes, setMassageTypes] = useState<MassageType[]>([])
    const [therapists, setTherapists] = useState<Therapists[]>([])

    // Stores selected options by the user.
    const [selectedMassage, setSelectedMassage] = useState<MassageId>(null)
    const [selectedTherapist, setSelectedTherapist] = useState<TherapistUuid>(null)
    const [durationAndPrice, setDurationAndPrice] = useState<DurationAndPriceType>({
        duration: 0,
        price: ''
    })

    // Helps the selected duration and price option.
    const durationsAndPrices = Array.from({ length: 3 }, (_, i) => ({
        duration: [60, 75, 90][i],
        price: [100, 125, 150][i]
    }))
    const options = durationsAndPrices.map(o => `${o.duration}-$${o.price}.00`)

    // Handles the selected duration and price options from the user.
    function handleDurationAndPrice(targetValue: string) {
        const value = targetValue.split('-$')
        const options = {
            duration: Number(value[0]),
            price: value[1] + '.00'
        }
        setDurationAndPrice({ ...options })
    }

    // Used for the "Continue to Booking" button
    const isDisabled = selectedMassage === null || selectedTherapist === null

    // Makes API requests to the database.
    useEffect(() => {
        ;(async () => {
            try {
                const mResponse = await fetch('/api/massage_types')
                const tResponse = await fetch('/api/therapists')
                setMassageTypes(await mResponse.json())
                setTherapists(await tResponse.json())
            } catch (error) { console.error(`Fetching error: ${error}`) }
        })()
    }, [])

    // Memoize means that the function inside useMemo will only
    // recompute its result if one of the dependencies changes.
    const memoValues = useMemo(() => ({
        selectedMassage: String(selectedMassage),
        selectedTherapist: String(selectedTherapist),
        durationAndPrice: JSON.stringify(durationAndPrice)
    }), [selectedMassage, selectedTherapist, durationAndPrice])

    // Stores the data of the selected options
    // from the first page into separate values.
    // This helps the browser remember which
    // options the user selected.
    useEffect(() => {
        if (typeof localStorage === 'undefined') return

        if (memoValues.selectedMassage !== 'null')
            localStorage.setItem('selectedMassage', memoValues.selectedMassage)
        if (memoValues.selectedTherapist !== 'null')
            localStorage.setItem('selectedTherapist', memoValues.selectedTherapist)
        if (memoValues.durationAndPrice !== '{"duration":0,"price":0}')
            localStorage.setItem('durationAndPrice', memoValues.durationAndPrice)
    }, [memoValues])

    // If the first useEffect hook succeeded, then this one
    // will get those values from the browser's localStorage
    // and store them into their respective variables.
    // This helps the browser remember which
    // options the user selected.
    useEffect(() => {
        const massageId = localStorage.getItem('selectedMassage') as MassageId | null
        const therapistId = localStorage.getItem('selectedTherapist') as TherapistUuid | null
        const asString = String(localStorage.getItem('durationAndPrice'))
        const durationAndPrice = JSON.parse(asString) as DurationAndPriceType | '{}'

        ;(() => { // This ensures that these statements will only run once
            if (massageId !== null)
                setSelectedMassage(massageId)
            if (therapistId !== null)
                setSelectedTherapist(therapistId)
            if (durationAndPrice !== '{}')
                setDurationAndPrice(durationAndPrice)

            console.log('Successfully retrieved selected options from localStorage!')
        })()
    }, [])

    return (
        <div className='container mx-auto p-6 lg:max-w-[95%] md:max-w-3xl sm:max-w-3xl'>
            <header className='flex flex-col-reverse'>
                <h1 className='text-3xl font-bold mb-8 text-center'>
                    Choose your Massage Type and Therapist
                </h1>
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
                <div className='absolute top-4 right-4'>
                    <ThemeToggle />
                </div>
            </header>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-8'>
                {/* Massage Types Section */}
                <div className='space-y-4 flex flex-col items-center'>
                    <h2 className='text-2xl font-semibold mb-4'>
                        Select Massage Type
                    </h2>
                    {massageTypes.map(m => (
                        <Card
                            title='Click the card to select the massage you want!'
                            key={m.id}
                            className={`btn type
                                ${selectedMassage === m.id ? 'chosen' : 'not-chosen'}`}
                            onClick={() => setSelectedMassage(m.id)}
                        >
                            <Card.Body className='flex items-center gap-4 flex-col p-5'>
                                <Card.Title className='text-xl'>{m.name}</Card.Title>
                                <select
                                    title='Select a Duration and Price'
                                    name='Duration and Price'
                                    className='select option'
                                >
                                    <option className='italic' disabled>
                                        Select a Duration and Price
                                    </option>
                                    {durationsAndPrices.map((o, idx) => (
                                        <option
                                            key={idx}
                                            onClick={() => handleDurationAndPrice(options[idx])}
                                            value={options[idx]}>
                                            {o.duration} minutes - ${o.price}.00
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
                            className={`btn therapist
                                ${selectedTherapist === t.uuid ? 'chosen' : 'not-chosen'}`}
                            onClick={() => setSelectedTherapist(t.uuid)}>
                            <Card.Body className='flex items-center gap-4 flex-col p-10'>
                                <Card.Title className='font-bold text-lg'>
                                    {t.first_name} {t.last_name}
                                </Card.Title>
                                {/*<p className='text-sm'>{t.uuid}</p>*/}
                                <p className='text-sm'>{t.email}</p>
                                <p className='text-sm'>{t.phone_number}</p>
                                <p className='text-sm'>{t.qualifications}</p>
                                <div className='flex gap-2 mt-2 flex-wrap-reverse'>
                                    <span className='badge badge-info badge-outline p-8'>{t.specialties}</span>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
            {/* Continuation Button */}
            <div className={`text-center ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                <Button
                    size='lg'
                    color='success'
                    className='border-2 disabled:border-slate-400 continue'
                    disabled={isDisabled}
                    onClick={() => router.push('/booking-page/final')}>
                    Continue to Booking...
                </Button>
            </div>
        </div>
    )
}
