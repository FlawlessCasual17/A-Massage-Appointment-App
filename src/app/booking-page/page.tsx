'use client'
import { FormEvent, useState } from 'react'
import { TablesInsert } from '../../../database.types'
import { bookingHandler } from '../actions/bookingHandler'

export default function Page() {
    type patients = TablesInsert<'patients'>

    function getFormattedDate() {
        const date = new Date()
        const fullYear = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')
        return `${fullYear}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }

    const [formData, setFormData] = useState<patients>({
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
        <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg'>
            <h1 className='text-2xl font-bold mb-6'>Book Your Massage</h1>
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
                {/* <div>
                    <label className='block mb-2'>ZIP Code</label>
                    <input
                        type='text'
                        value={formData.zip_address || ''}
                        onChange={e => setFormData({ ...formData, zipAddress: e.target.value })}
                        className='w-full p-2 border rounded'
                    />
                </div> */}
                <button type='submit' className='btn w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'>
                    Book Appointment
                </button>
            </form>
        </div>
    )
}
