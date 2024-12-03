import Image from 'next/image'
import iconWithText from '../../assets/iconWithText.dark.svg'
import ThemeToggle from './themeToggle'
import Button from './button'

export default function TopSection() {
    return ( /* h-[82.4px] */
        <div className='w-full relative text-center text-xl text-light font-inter'>
            <div className='absolute top-0 left-0 w-[338px] h-[82.41px] text-left'>
                <Image alt='iconWithText' src={iconWithText} />
            </div>
            <div className='absolute top-[2.263rem] left-[34rem] w-[44.125rem] h-[2.125rem]'>
                <b className='absolute top-0 left-[0.063rem]'>Home</b>
                <b className='absolute top-0 left-[39.063rem]'>Contact</b>
                <b className='absolute top-0 left-[18rem] m-0'>Therapists</b>
                <div className='absolute top-[1.672rem] left-[-0.016rem] border-violet-500 border-t-[2.5px] border-solid box-border w-[3.781rem] h-[0.156rem]' />
            </div>
            <Button />
            <ThemeToggle />
        </div>
    )
}
