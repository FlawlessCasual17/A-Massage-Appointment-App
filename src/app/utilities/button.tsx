'use client'
import { MouseEventHandler as msHandler } from 'react'
import sty from './button.module.css'

export default function Button(props: { onClick: msHandler<HTMLInputElement>; value: string }) {
    return <input {...props} type='button' className={`btn ${sty.button}`} />
}
