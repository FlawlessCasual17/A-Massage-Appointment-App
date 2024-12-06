'use client'
import { FormEvent, useState } from 'react'
import { TablesInsert } from '../../../database.types'
import { bookingHandler } from '../actions/bookingHandler'
import { Button, Input } from 'react-daisyui'
import './styles.css'

type Patients = TablesInsert<'patients'>

export default function Final() {
    function getFormattedDate() {
        const date = new Date()
        const fullYear = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')
        // Return the current date in the format: yyyy-MM-dd HH:mm:ss
        return `${fullYear}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }

    const [formData, setFormData] = useState<Patients>({
        first_name: '',
        surname: '',
        email: '',
        date_registered: getFormattedDate(),
        type_of_massage: 1, // Default value, can be updated based on selection
        gender: null,
        notes: null,
        phone_number: null,
        appointment_date: null,
        user_id: null
    })

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        const result = await bookingHandler(formData)
        if (result.success) {
            // Handle success (e.g., show success message, redirect)
            console.log(result)
        } else {
            // Handle error (e.g., show error message)
        }
    }

    return ( // todo: Implement the functionality from https://www.lavenderandlilymassage.com/
        <div className='max-w-md mx-auto mt-10 p-6 rounded-lg shadow-lg ring-2 ring-neutral'>
            <h1 className='text-2xl font-bold mb-6'>Finish booking your massage!</h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label className='block mb-2'>First Name</label>
                    <input
                        type='text'
                        value={formData.first_name || ''}
                        onChange={e => setFormData({ ...formData, first_name: e.target.value })}
                        className='w-full p-2 border rounded'
                    />
                </div>
                <div>
                    <label className='block mb-2'>Surname</label>
                    <input
                        type='text'
                        value={formData.surname || ''}
                        onChange={e => setFormData({ ...formData, surname: e.target.value })}
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
                {/* TODO: Add phone number, gender, and other inputs here. */}
                <Button type='submit' className='submit'>Book Appointment</Button>
            </form>
        </div>
    )
}
