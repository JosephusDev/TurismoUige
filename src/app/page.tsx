'use client'
import { createClient } from '@/services/supabase/client'
import { useSignOut, useSignUp, useSignIn } from '@/useCases/auth'

export default function Page() {
  const supabase = createClient()
  const { signUp, isLoading, error: errorSignUp } = useSignUp()
  const { signIn, data, error: errorSignIn } = useSignIn()

  const handleSignIn = () =>
    signIn({
      email: 'condepinto2@gmail.com',
      password: 'adminadmin',
    })

  const handleSignUp = () => {
    const data = signUp({
      email: 'condepinto2@gmail.com',
      password: 'adminadmin',
    })
    console.log(data)
  }

  const handleSignOut = () => {
    useSignOut()
  }

  return (
    <div>
      <button onClick={handleSignIn}>Log in</button>
      <button onClick={handleSignUp}>Sign up</button>
      {data?.user && <button onClick={handleSignOut}>SignOut</button>}
      <div>{data?.user.role}</div>
    </div>
  )
}
