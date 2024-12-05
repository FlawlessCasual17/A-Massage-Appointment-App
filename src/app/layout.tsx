import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { ReactNode } from 'react'

const interRegular = localFont({
    src: './fonts/InterVariable.woff2',
    variable: '--font-inter-regular',
    weight: '100 900'
})

export const metadata: Metadata = {
    title: 'A Massage Appointment App',
    description: 'Book your massage appointment today!'
}

type reactNodeType = Readonly<{ children: ReactNode }>

export default function RootLayout({ children }: reactNodeType) {
    return (
        <html lang='en'>
            <body className={`${interRegular.variable} antialiased`}>
                {children}
            </body>
        </html>
    )
}
