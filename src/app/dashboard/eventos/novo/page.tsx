'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft } from 'lucide-react'
import { useCreateEvent } from '@/useCases/event/createEvent'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { eventSchema, type EventSchema } from '@/services/supabase/types/schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import type { ControllerRenderProps } from 'react-hook-form'

export default function NovoEventoPage() {
  const router = useRouter()
  const { createEvent, isPending } = useCreateEvent()

  const form = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      date: '',
      address: '',
      description: '',
    },
  })

  const onSubmit = async (data: EventSchema) => {
    try {
      await createEvent(data)
      toast.success('Evento criado com sucesso!')
      router.push('/dashboard')
    } catch (error) {
      toast.error('Erro ao criar evento. Tente novamente.')
      console.error('Erro ao criar evento:', error)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='w-full max-w-2xl bg-white rounded-lg shadow-md p-8'>
        <div className='flex items-center mb-6'>
          <Button
            variant='ghost'
            onClick={() => router.back()}
            className='mr-4'
            disabled={isPending}
          >
            <ArrowLeft className='h-4 w-4 mr-2' />
            Voltar
          </Button>
          <h1 className='text-2xl font-bold'>Novo Evento</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='title'
              render={({
                field,
              }: { field: ControllerRenderProps<EventSchema, 'title'> }) => (
                <FormItem>
                  <FormLabel>Nome do Evento</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='date'
              render={({
                field,
              }: { field: ControllerRenderProps<EventSchema, 'date'> }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <Input type='date' {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='address'
              render={({
                field,
              }: { field: ControllerRenderProps<EventSchema, 'address'> }) => (
                <FormItem>
                  <FormLabel>Local</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({
                field,
              }: {
                field: ControllerRenderProps<EventSchema, 'description'>
              }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                {isPending ? 'Salvando...' : 'Salvar Evento'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
