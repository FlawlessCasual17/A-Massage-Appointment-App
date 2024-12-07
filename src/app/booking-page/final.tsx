'use client'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { Button, Input } from 'react-daisyui'
import { Patients } from 'types'
import { bookingHandler } from '../actions/bookingHandler'
import './styles.css'

type PatientDispatchFunction = Dispatch<SetStateAction<Patients>>

export default function Final(p: { formData: Patients, setFormData: PatientDispatchFunction }) {
    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        const result = await bookingHandler(p.formData)
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
                        value={p.formData.first_name || ''}
                        onChange={e => p.setFormData({ ...p.formData, first_name: e.target.value })}
                        className='w-full p-2 border rounded'
                    />
                </div>
                <div>
                    <label className='block mb-2'>Surname</label>
                    <Input
                        type='text'
                        value={p.formData.last_name || ''}
                        onChange={e => p.setFormData({ ...p.formData, last_name: e.target.value })}
                        className='w-full p-2 border rounded'
                    />
                </div>
                <div>
                    <label className='block mb-2'>Email</label>
                    <input
                        type='email'
                        value={p.formData.email || ''}
                        onChange={e => p.setFormData({ ...p.formData, email: e.target.value })}
                        className='w-full p-2 border rounded'
                    />
                </div>
                {/* TODO: Add phone number, gender, and other inputs here. */}
                <div>
                    <label className='block mb-2'>Phone Number</label>
                    <Input
                        type='tel'
                        value={p.formData.phone_number || ''}
                        onChange={e => p.setFormData({ ...p.formData, phone_number: e.target.value })}
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
