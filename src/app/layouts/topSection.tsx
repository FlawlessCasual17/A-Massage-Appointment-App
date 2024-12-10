'use client'
import Image from 'next/image'
import darkIconWithText from '@/assets/iconWithText.dark.svg'
import lightIconWithText from '@/assets/iconWithText.light.svg'
import ThemeToggle from '@/app/components/themeToggle'
import { useRouter } from 'next/navigation'
import sty from './topSection.module.css'
import { useTheme } from '@/app/components/themeProvider'

export default function TopSection() {
    const router = useRouter()
    const { theme } = useTheme()
    const handleClick = () => router.push('/booking-page')

    return (
        <div className='w-full h-[85px] relative text-center text-xl text-light'>
            <div className='absolute top-0 left-0 w-[338px] h-[82.41px] text-left'>
                <Image
                    alt='iconWithText'
                    src={theme === 'dark' ? darkIconWithText : lightIconWithText}
                />
            </div>
            <div className='absolute top-[2.263rem] left-[34rem] w-[44.125rem] h-[2.125rem]'>
                <b className='absolute top-0 left-[0.063rem]'>Home</b>
                <b className='absolute top-0 left-[39.063rem]'>Contact</b>
                <b className='absolute top-0 left-[18rem] m-0'>Therapists</b>
                <div className={sty.underlineStyling} />
            </div>
            <button onClick={handleClick} className={`btn ${sty.button}`}>
                book now
            </button>
            <div className={sty.themeToggle}>
                <ThemeToggle />
            </div>
        </div>
    )
}
