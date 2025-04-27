import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCreateEvent } from '@/useCases/event/createEvent'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { eventSchema, type EventSchema } from '@/services/supabase/types/schema'
import { Label } from '@/components/ui/label'
import { LabelError } from '@/components/ui/label-error'
import { Loader2 } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
type FormData = Omit<EventSchema, 'id'>

export function AddEvent() {
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
        <LabelError message={form.formState.errors.description?.message} />
      </div>

      <div className='flex justify-end space-x-4'>
        <Button type='submit' disabled={isPending}>
          {isPending ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            'Salvar Evento'
          )}
        </Button>
      </div>
    </form>
  )
}
