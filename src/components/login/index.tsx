'use client'
import { useSignUp, useLogin } from '@/useCases/auth'
import { useRouter } from 'next/navigation'

export function LoginPage() {
  const router = useRouter()

  const handleSignIn = async () => {
    try {
      await useLogin({
        email: 'condepinto2@gmail.com',
        password: 'adminadmin',
      })
      router.push('/private')
    } catch (error) {
      console.error('Erro ao fazer login:', error)
    }
  }

  const handleSignUp = async () => {
    try {
      await useSignUp({
        email: 'condepinto2@gmail.com',
        password: 'adminadmin',
      })
      router.push('/private')
    } catch (error) {
      console.error('Erro ao fazer cadastro:', error)
    }
  }

  return (
    <div>
      <button onClick={handleSignIn}>Log in</button>
      <button onClick={handleSignUp}>Sign up</button>
    </div>
  )
}
