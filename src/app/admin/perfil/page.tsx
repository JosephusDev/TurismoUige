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

  const profile: UserSchema = {
    email: user.email!,
    password: '',
  }

  if (!profile) {
    redirect('/')
  }

  return (
    <div>
      <div className='m-8 sm:m-16 flex justify-center items-center'>
        <ProfileForm user={profile} />
      </div>
    </div>
  )
}
