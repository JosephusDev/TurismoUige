import { createClient } from '@/services/supabase/server'
import { redirect } from 'next/navigation'
import { ProfileForm } from '@/components/profile'
import { UserSchema } from '@/services/supabase/types/schema'
import { AppSidebar } from '@/components/sidebar'
import { User } from 'lucide-react'
export default async function Page() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }

  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  const profile: UserSchema = {
    email: userData?.email!,
    username: userData?.username!,
    role: userData?.role!,
  }

  return (
    <AppSidebar>
      <div className='w-full min-h-screen flex items-center justify-center'>
        <div className='w-full max-w-2xl rounded-lg border-gray-200 border-2 p-8'>
          <div className='flex items-center mb-6 gap-2'>
            <User size={24} />
            <h1 className='text-2xl font-bold'>Minha Conta</h1>
          </div>
          <ProfileForm userId={user.id} userData={profile} />
        </div>
      </div>
    </AppSidebar>
  )
}
