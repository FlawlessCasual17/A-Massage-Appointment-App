import TopSection from './layouts/topSection'
import { initSupabaseClient } from 'utils/supabase/supabase/clientInit'

export default async function Home() {
    const supabase = initSupabaseClient()

    return (
        <div className='m-6 top-0 left-0 '>
            <TopSection />
        </div>
    )
}
