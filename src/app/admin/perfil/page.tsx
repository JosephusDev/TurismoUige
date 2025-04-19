import { createClient } from '@/services/supabase/server'
import { redirect } from 'next/navigation'
import { ProfileForm } from '@/components/profile'
import { UserSchema } from '@/services/supabase/types/schema'
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
    <div className='m-8 sm:m-16 flex justify-center items-center'>
      <div className='w-full  md:w-1/2 sm:w-3/4 flex flex-col'>
        <h1 className='text-xl font-bold mb-4'>Editar perfil</h1>
        <ProfileForm userId={user.id} userData={profile} />
      </div>
    </div>
  )
}
