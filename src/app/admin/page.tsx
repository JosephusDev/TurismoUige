import { createClient } from '@/services/supabase/server'
import { redirect } from 'next/navigation'
export default async function Page() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  async function handleLogout() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/')
  }

  return (
    <div>
      <p>Hello {data?.user?.email}</p>
      <form action={handleLogout}>
        <button
          type='submit'
          className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
        >
          Sair
        </button>
      </form>
    </div>
  )
}
