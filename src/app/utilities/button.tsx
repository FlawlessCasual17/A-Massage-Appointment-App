'use client'

import { bookingHandler } from '../actions/bookingHandler'
import sty from './button.module.css'
import { MouseEventHandler as msHandler } from 'react'

export default function Button(props: { onClick: msHandler<HTMLInputElement>, value: string }) {
    async function clickHandler() {
        const r = await bookingHandler()
        // TODO: implement a conditional statement here...
    }

    return <input {...props} type='button' className={`btn ${sty['btn-styling']} ${sty['input-styling']}`} />
}
