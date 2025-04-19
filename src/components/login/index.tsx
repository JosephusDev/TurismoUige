'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthSchema, authSchema } from '@/services/supabase/types/schema'
import { LabelError } from '../ui/label-error'
import { useLogin } from '@/useCases/auth'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const router = useRouter()
  const form = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
  })

  const onSubmit = async (data: AuthSchema) => {
    try {
      const user = await useLogin(data)
      if (user) {
        form.reset()
        toast.success('Login realizado com sucesso')
        router.refresh()
      }
    } catch (error) {
      toast.error('Erro ao fazer o login')
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <div className='flex top-0 left-0 w-full absolute px-2 sm:px-40 py-4 bg-transparent:bg-primary justify-between items-center'>
        <h1 className='text-2xl font-bold'>Zaya Uíge</h1>
        <Link
          href={'/'}
          className='rounded-full text-pink-500 bg-white px-6 py-1 border-pink-500 border-[1px] hover:bg-pink-500 hover:text-white transition-all duration-300 ease-in-out'
        >
          INÍCIO
        </Link>
      </div>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Bem-vindo ao Zaya Uíge</CardTitle>
          <CardDescription>
            Faça login e desfrute o melhor da província
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid gap-6'>
              <div className='grid gap-6'>
                <div className='grid gap-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='Digite seu email'
                    {...form.register('email', { required: true })}
                  />
                  {form.formState.errors.email && (
                    <LabelError
                      message={form.formState.errors.email.message!}
                    />
                  )}
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='password'>Senha</Label>
                  <Input
                    id='password'
                    type='password'
                    placeholder='••••••••'
                    {...form.register('password', { required: true })}
                  />
                  {form.formState.errors.password && (
                    <LabelError
                      message={form.formState.errors.password.message!}
                    />
                  )}
                </div>
                <Button
                  type='submit'
                  className='w-full bg-pink-500 text-white rounded-full'
                >
                  Entrar
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
