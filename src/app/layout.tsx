import '@fontsource-variable/inter'
import { StyledEngineProvider } from '@mui/material'
import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import { ThemeProvider } from '@/app/components/themeProvider'

export const metadata: Metadata = {
    title: 'LOTUS Massage Therapy',
    description: 'Book your massage appointment today!'
}

type ReadonlyReactNode = Readonly<{ children: ReactNode }>

export default function RootLayout({ children }: ReadonlyReactNode) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body className='antialiased'>
                <ThemeProvider>
                    <StyledEngineProvider injectFirst>
                        {children}
                    </StyledEngineProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
