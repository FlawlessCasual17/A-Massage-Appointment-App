'use client'
import { Dispatch, FormEvent, SetStateAction } from 'react'
import { Button, Input } from 'react-daisyui'
import { Appointments, Genders, Patients } from '@/utils/types'
import { bookingHandler } from '../actions/bookingHandler'
import './styles.css'

type props = { formData: Patients, setFormData: Dispatch<SetStateAction<Patients>> }

export default function Final({ formData, setFormData }: props) {
    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        const result = await bookingHandler(formData)
        if (result.success) {
            // Handle success (e.g., show success message, redirect)
            console.log(result)
        } else {
            // Handle error (e.g., show error message)
            console.error(`An error occurred: ${result}`)
        }
    }

    return (
        <div className='max-w-md mx-auto mt-10 p-6 rounded-lg shadow-lg ring-2 ring-neutral'>
            <h1 className='text-2xl font-bold mb-6'>Finish booking your massage!</h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label className='block mb-2'>First Name</label>
                    <Input
                        type='text'
                        value={formData.first_name || ''}
                        onChange={e => setFormData({ ...formData, first_name: e.target.value })}
                        className='w-full p-2 border rounded'
                    />
                </div>
                <div>
                    <label className='block mb-2'>Last Name/Surname</label>
                    <Input
                        type='text'
                        value={formData.last_name || ''}
                        onChange={e => setFormData({ ...formData, last_name: e.target.value })}
                        className='w-full p-2 border rounded'
                    />
                </div>
                <div>
                    <label className='block mb-2'>Email</label>
                    <input
                        type='email'
                        value={formData.email || ''}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className='w-full p-2 border rounded'
                    />
                </div>
                <div>
                    <label className='block mb-2'>Gender</label>
                    <Input
                        type='tel'
                        value={formData.phone_number || ''}
                        onChange={e => setFormData({ ...formData, phone_number: e.target.value })}
                        className='w-full p-2 border rounded'
                    />
                </div>
                {/* TODO: Add phone number, gender, and other inputs here. */}
                <div>
                    <label className='block mb-2'>Phone Number</label>
                    <Input
                        type='tel'
                        value={formData.phone_number || ''}
                        onChange={e => setFormData({ ...formData, phone_number: e.target.value })}
                        className='w-full p-2 border rounded'
                    />
                </div>
                <div>
                    <label className='block mb-2'>Phone Number</label>
                    <Input
                        type='tel'
                        value={formData.phone_number || ''}
                        onChange={e => setFormData({ ...formData, phone_number: e.target.value })}
                        className='w-full p-2 border rounded'
                    />
                </div>
                <Button type='submit' className='submit'>
                    Book Appointment
                </Button>
            </form>
        </div>
    )
}
