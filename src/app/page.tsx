import TopSection from './layouts/topSection'
import { createClient } from 'utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Home() {
    const cookieStore = await cookies()
    // const supabase = createClient(cookieStore)

    return (
        <div className='m-6 top-0 left-0 '>
            <TopSection />
        </div>
    )
}
