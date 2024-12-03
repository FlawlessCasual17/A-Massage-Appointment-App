import sty from './button.module.css'

export default function Button() {
    return (
        <div className={`btn ${sty.btn_styling} hover:bg-violet-500 hover:border-violet-600`}>
            <input type='button' value='book now' className='relative leading-[1.5rem] uppercase text-ellipsis whitespace-nowrap' />
        </div>
    )
}
