'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { LabelError } from '../ui/label-error'
import { useUpdateUser } from '@/useCases/user/updateUser'
import { UserSchema, userSchema } from '@/services/supabase/types/schema'

export function ProfileForm({
  userId,
  userData,
}: {
  userId: string
  userData: UserSchema
}) {
  const router = useRouter()
  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: userData.email || '',
      username: userData.username || '',
      role: userData.role || '',
    },
  })

  const { updateUser, isPending, error } = useUpdateUser()

  const onSubmit = async (data: UserSchema) => {
    try {
      await updateUser({
        userId,
        authData: {
          email: data.email,
          password: data.password!,
        },
        userData: {
          email: data.email,
          username: data.username,
          role: data.role,
        },
      })
      if (error instanceof Error) {
        toast.error(error.message)
      }
      toast.success('Perfil atualizado com sucesso!')
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Erro ao atualizar o perfil',
      )
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          {...form.register('email')}
          id='email'
          type='email'
          placeholder='Seu email'
          className='py-0.5'
        />
        {form.formState.errors.email && (
          <LabelError message={form.formState.errors.email.message!} />
        )}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='username'>Nome de usuário</Label>
        <Input
          {...form.register('username')}
          id='username'
          type='text'
          placeholder='••••••••'
          className='py-0.5'
        />
        {form.formState.errors.username && (
          <LabelError message={form.formState.errors.username.message!} />
        )}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='password'>Senha</Label>
        <Input
          {...form.register('password')}
          id='password'
          type='password'
          placeholder='••••••••'
          className='py-0.5'
        />
        {form.formState.errors.password && (
          <LabelError message={form.formState.errors.password.message!} />
        )}
      </div>

      <Button type='submit' className='w-full' disabled={isPending}>
        {isPending ? <Loader2 className='animate-spin' /> : 'Salvar alterações'}
      </Button>
    </form>
  )
}
