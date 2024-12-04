'use client'
import { FormEvent, useState } from 'react'
import { TablesInsert } from '../../../database.types'
import { bookingHandler } from '../actions/bookingHandler'

export default function Page() {
    const date = new Date()

    type patients = TablesInsert<'patients'>

    const [formData, setFormData] = useState<patients>({
        firstName: '',
        surName: '',
        emailAddress: '',
        zipAddress: '',
        dateRegistered: date.toISOString().split('T')[0],
        timeRegistered: date.toTimeString().split('T')[0]
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
                        value={formData.firstName || ''}
                        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                        className='w-full p-2 border rounded'
                    />
                </div>
                <div>
                    <label className='block mb-2'>Surname</label>
                    <input
                        type='text'
                        value={formData.surName || ''}
                        onChange={e => setFormData({ ...formData, surName: e.target.value })}
                        className='w-full p-2 border rounded'
                    />
                </div>
                <div>
                    <label className='block mb-2'>Email</label>
                    <input
                        type='email'
                        value={formData.emailAddress || ''}
                        onChange={e => setFormData({ ...formData, emailAddress: e.target.value })}
                        className='w-full p-2 border rounded'
                    />
                </div>
                <div>
                    <label className='block mb-2'>ZIP Code</label>
                    <input
                        type='text'
                        value={formData.zipAddress || ''}
                        onChange={e => setFormData({ ...formData, zipAddress: e.target.value })}
                        className='w-full p-2 border rounded'
                    />
                </div>
                <button type='submit' className='btn w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'>
                    Book Appointment
                </button>
            </form>
        </div>
    )
}
