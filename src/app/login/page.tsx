import { LoginForm } from '@/components/login'
import Image from 'next/image'
import loginBG from '@/assets/images/bg.png'

export default async function Page() {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <Image
        alt='LoginBG'
        src={loginBG}
        className='absolute top-0 left-0 w-full h-full bg-contain -z-10'
      />
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <LoginForm />
      </div>
    </div>
  )
}
