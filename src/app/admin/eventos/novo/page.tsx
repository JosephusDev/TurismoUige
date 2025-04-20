'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar } from 'lucide-react'
import { useCreateEvent } from '@/useCases/event/createEvent'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { eventSchema, type EventSchema } from '@/services/supabase/types/schema'
import { Label } from '@/components/ui/label'
import { LabelError } from '@/components/ui/label-error'
import { Loader2 } from 'lucide-react'
import { AppSidebar } from '@/components/sidebar'
import { useQueryClient } from '@tanstack/react-query'

type FormData = Omit<EventSchema, 'id'>

export default function NovoEventoPage() {
  const router = useRouter()
  const { createEvent, isPending } = useCreateEvent()
  const queryClient = useQueryClient()

  const form = useForm<FormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      date: '',
      address: '',
      description: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      await createEvent(data)
      toast.success('Evento criado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['event'] })
      router.push('/admin/eventos')
    } catch (error) {
      toast.error('Erro ao criar evento. Tente novamente.')
      console.error('Erro ao criar evento:', error)
    }
  }

  return (
    <AppSidebar>
      <div className='w-full min-h-screen flex items-center justify-center'>
        <div className='w-full max-w-2xl rounded-lg border-gray-200 border-2 p-8'>
          <div className='flex items-center mb-6 gap-2'>
            <Calendar size={24} />
            <h1 className='text-2xl font-bold'>Novo Evento</h1>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <Label>Título do Evento</Label>
              <Input
                placeholder='Digite o título do evento'
                {...form.register('title')}
                disabled={isPending}
                className='mb-2'
              />
              <LabelError message={form.formState.errors.title?.message} />
            </div>

            <div>
              <Label>Data</Label>
              <Input
                type='date'
                {...form.register('date')}
                disabled={isPending}
                className='mb-2'
              />
              <LabelError message={form.formState.errors.date?.message} />
            </div>

            <div>
              <Label>Local</Label>
              <Input
                placeholder='Digite o local do evento'
                {...form.register('address')}
                disabled={isPending}
                className='mb-2'
              />
              <LabelError message={form.formState.errors.address?.message} />
            </div>

            <div>
              <Label>Descrição</Label>
              <Input
                placeholder='Digite a descrição do evento'
                {...form.register('description')}
                disabled={isPending}
                className='mb-2'
              />
              <LabelError
                message={form.formState.errors.description?.message}
              />
            </div>

            <div className='flex justify-end space-x-4'>
              <Button
                type='button'
                variant='outline'
                onClick={() => router.back()}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button type='submit' disabled={isPending}>
                {isPending ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  'Salvar Evento'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AppSidebar>
  )
}
