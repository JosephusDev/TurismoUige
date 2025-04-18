'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Pencil, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { useDeleteEvent } from '@/useCases/event/deleteEvent'
import { useQueryClient } from '@tanstack/react-query'

interface EventActionsProps {
  eventId: string
  isConfirmed: boolean
}

export function EventActions({ eventId, isConfirmed }: EventActionsProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { deleteEvent, isPending } = useDeleteEvent()
  const queryClient = useQueryClient()

  const handleEdit = () => {
    router.push(`/dashboard/eventos/editar/${eventId}`)
  }

  const handleDelete = async () => {
    try {
      await deleteEvent(eventId)
      toast.success('Evento Confirmado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['event'] })
    } catch (error) {
      toast.error('Erro ao confirmar evento')
      console.error('Erro ao confirmar evento:', error)
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0 sm:h-10 sm:w-10'>
          <span className='sr-only'>Abrir menu</span>
          <MoreHorizontal className='h-4 w-4 sm:h-5 sm:w-5' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-40 sm:w-48'>
        <DropdownMenuItem
          onClick={handleDelete}
          disabled={isPending}
          className='flex items-center gap-2 text-green-600 text-sm sm:text-base'
        >
          <CheckCircle2 className='h-4 w-4 sm:h-5 sm:w-5' />
          Confirmar
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleEdit}
          className='flex items-center gap-2 text-sm sm:text-base'
        >
          <Pencil className='h-4 w-4 sm:h-5 sm:w-5' />
          Editar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
