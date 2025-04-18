'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import { useCreateEvent } from '@/useCases/event/createEvent'
import { toast } from 'sonner'

export default function NovoEventoPage() {
  const router = useRouter()
  const { createEvent, isPending } = useCreateEvent()
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    address: '',
    description: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createEvent(formData)
      toast.success('Evento criado com sucesso!')
      router.push('/dashboard')
    } catch (error) {
      toast.error('Erro ao criar evento. Tente novamente.')
      console.error('Erro ao criar evento:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
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

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='title'>Nome do Evento</Label>
            <Input
              id='title'
              name='title'
              value={formData.title}
              onChange={handleChange}
              required
              disabled={isPending}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='date'>Data</Label>
            <Input
              id='date'
              name='date'
              type='date'
              value={formData.date}
              onChange={handleChange}
              required
              disabled={isPending}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='address'>Local</Label>
            <Input
              id='address'
              name='address'
              value={formData.address}
              onChange={handleChange}
              required
              disabled={isPending}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='description'>Descrição</Label>
            <Input
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              required
              disabled={isPending}
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
              {isPending ? 'Salvando...' : 'Salvar Evento'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
