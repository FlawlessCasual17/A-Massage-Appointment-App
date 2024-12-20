'use client'
import Image from 'next/image'
import darkIconWithText from '@/assets/iconWithText.dark.svg'
import lightIconWithText from '@/assets/iconWithText.light.svg'
import ThemeToggle from '@/app/components/themeToggle'
import { useRouter } from 'next/navigation'
import sty from './topSection.module.css'
import { useTheme } from '@/app/components/themeProvider'

export default function TopSection() {
    const { theme } = useTheme()
    const router = useRouter()
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
                <span className='font-bold absolute top-0 left-[0.063rem]'>Home</span>
                <span className='font-bold absolute top-0 left-[39.063rem]'>Contact</span>
                <span className='font-bold absolute top-0 left-[18rem] m-0'>Therapists</span>
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
