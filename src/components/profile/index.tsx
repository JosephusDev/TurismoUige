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

export function ProfileForm({ user }: { user: UserSchema }) {
  const router = useRouter()
  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: user.email || '',
      password: '',
    },
  })

  const { updateUser, isPending } = useUpdateUser()

  const onSubmit = async (data: UserSchema) => {
    try {
      await updateUser({ user: data })
      toast.success('Perfil atualizado com sucesso!')
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Erro ao atualizar perfil',
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
        <Label htmlFor='password'>Nova senha</Label>
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
