'use client'
import Image from 'next/image'
import iconWithText from '../../assets/iconWithText.dark.svg'
import ThemeToggle from '../components/utilities/themeToggle'
import { Button } from 'react-daisyui'
import { useRouter } from 'next/navigation'
import sty from './topSection.module.css'

export default function TopSection() {
    const r = useRouter()
    const handleClick = () => r.push('/booking-page')

    // TODO: Add functionality to the theme toggle here ⬇️

    return (
        <div className='w-full h-[85px] relative text-center text-xl text-light'>
            <div className='absolute top-0 left-0 w-[338px] h-[82.41px] text-left'>
                <Image alt='iconWithText' src={iconWithText} />
            </div>
            <div className='absolute top-[2.263rem] left-[34rem] w-[44.125rem] h-[2.125rem]'>
                <b className='absolute top-0 left-[0.063rem]'>Home</b>
                <b className='absolute top-0 left-[39.063rem]'>Contact</b>
                <b className='absolute top-0 left-[18rem] m-0'>Therapists</b>
                <div className='absolute top-[1.672rem] left-[-0.016rem] border-violet-500 border-t-[2.5px] border-solid box-border w-[3.781rem] h-[0.156rem]' />
            </div>
            <Button onClick={handleClick} className={`btn ${sty.button}`}>
                book now
            </Button>
            <ThemeToggle />
        </div>
    )
}
