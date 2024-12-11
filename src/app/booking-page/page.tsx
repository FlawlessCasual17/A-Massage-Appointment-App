'use client'
import SelectedOptions from '@/app/actions/selectedOptions'
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
    const router = useRouter()

    const [massageTypes, setMassageTypes] = useState<MassageType[]>([])
    const [therapists, setTherapists] = useState<Therapists[]>([])

    const [selectedMassage, setSelectedMassage] = useState<MassageId>(null)
    const [selectedTherapist, setSelectedTherapist] = useState<TherapistUuid>(null)
    const [durationAndPrice, setDurationAndPrice] = useState<DurationAndPriceType>({
        duration: 0,
        price: 0
    })

    const durationsAndPrices = Array.from({ length: 3 }, (_, i) => ({
        duration: [60, 75, 90][i],
        price: [100, 125, 150][i]
    }))

    const options = durationsAndPrices.map(o => `${o.duration}-$${o.price}.00`)

    const [matchValue, setMatchValue] = useState('')
    // TODO: Add a function or variable that remembers
    //  which option from the drop-down menu was selected.

    // Handles the selected duration and price options from the user
    function handleDurationAndPrice(targetValue: string) {
        const value = targetValue.split('-$')
        setMatchValue(targetValue)
        const options = {
            duration: Number(value[0]),
            price: Number(value[1])
        }
        setDurationAndPrice({ ...options })
    }

    // Used for the "Continue to Booking" button
    const isDisabled = selectedMassage === null || selectedTherapist === null

    // Function to toggle layout
    function switchLayout() {
        const selectedOptions = new SelectedOptions()
        selectedOptions.set(durationAndPrice, selectedMassage, selectedTherapist)
        console.log('The following data was sent to the final booking page: ')
        console.log(durationAndPrice, selectedMassage, selectedTherapist)
        router.push('/booking-page/final')
    }

    useEffect(() => {
        (async function () {
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

    useEffect(() => {
        if (typeof localStorage === 'undefined') return

        if (memoValues.selectedMassage !== 'null') localStorage.setItem('selectedMassage', memoValues.selectedMassage)
        if (memoValues.selectedTherapist !== 'null')
            localStorage.setItem('selectedTherapist', memoValues.selectedTherapist)
        if (memoValues.durationAndPrice !== '{"duration":0,"price":0}')
            localStorage.setItem('durationAndPrice', memoValues.durationAndPrice)
    }, [memoValues])

    useEffect(() => {
        const massageId = localStorage.getItem('selectedMassage') as MassageId | null
        const therapistId = localStorage.getItem('selectedTherapist') as TherapistUuid | null
        const asString = localStorage.getItem('durationAndPrice') as string
        const durationAndPrice = JSON.parse(asString) as DurationAndPriceType | null

        if (massageId !== null) setSelectedMassage(Number(massageId))
        if (therapistId !== null) setSelectedTherapist(therapistId)
        if (durationAndPrice !== null) setDurationAndPrice(durationAndPrice)
    }, [])

    // useEffect(() => {
    //     const savedTheme = localStorage.getItem('theme') as Theme | null
    //     if (savedTheme) setTheme(savedTheme)
    //     else if (window.matchMedia('(prefers-color-scheme: dark)').matches)
    //         setTheme('dark')
    // }, [])

    // useEffect(() => {
    //     localStorage.setItem('theme', theme)
    //     document.documentElement.setAttribute('data-theme', theme)
    //     document.documentElement.classList.toggle('dark', theme === 'dark')
    // }, [theme])

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
                    <h2 className='text-2xl font-semibold mb-4'>Select Massage Type</h2>
                    {massageTypes.map(m => (
                        <Card
                            key={m.id}
                            className={`btn type ${selectedMassage === m.id ? 'chosen' : 'not-chosen'}`}
                            onClick={() => setSelectedMassage(m.id)}
                        >
                            <Card.Body className='flex items-center gap-4 flex-col p-5'>
                                <Card.Title className='text-xl'>{m.name}</Card.Title>
                                <select name='Duration and Price' className='select option'>
                                    <option disabled>Please select a duration and price</option>
                                    {durationsAndPrices.map((o, idx) =>
                                        <option
                                            key={idx}
                                            onClick={() => handleDurationAndPrice(options[idx])}
                                            value={options[idx]}
                                        >
                                            {o.duration} minutes - ${o.price}.00
                                        </option>
                                    )}
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
                            className={`btn therapist ${selectedTherapist === t.uuid ? 'chosen' : 'not-chosen'}`}
                            onClick={() => setSelectedTherapist(t.uuid)}>
                            <Card.Body className='flex items-center gap-4 flex-col p-10'>
                                <Card.Title className='font-bold text-lg'>
                                    {t.first_name} {t.last_name}
                                </Card.Title>
                                <p className='text-sm'>{t.email}</p>
                                <p className='text-sm'>{t.phone_number}</p>
                                <p className='text-sm'>{t.qualifications}</p>
                                <div className='flex gap-2 mt-2 flex-wrap-reverse'>
                                    <span className='badge badge-info badge-outline p-8'>
                                        {t.specialties}
                                    </span>
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
                    onClick={switchLayout}>
                    Continue to Booking...
                </Button>
            </div>
        </div>
    )
}
