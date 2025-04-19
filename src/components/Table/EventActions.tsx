'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Trash, Eye } from 'lucide-react'
import { toast } from 'sonner'
import { useDeleteEvent } from '@/useCases/event/deleteEvent'
import { useQueryClient } from '@tanstack/react-query'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { EventSchema } from '@/services/supabase/types/schema'

export function EventActions({ event }: { event: EventSchema }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const { deleteEvent, isPending: isDeleting } = useDeleteEvent()
  const queryClient = useQueryClient()

  const handleDelete = async () => {
    try {
      await deleteEvent(event.id)
      toast.success('Evento eliminado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['event'] })
      setIsDeleteDialogOpen(false)
    } catch (error) {
      toast.error('Erro ao eliminar evento')
      console.error('Erro ao eliminar evento:', error)
    }
  }

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0 sm:h-10 sm:w-10'>
            <span className='sr-only'>Abrir menu</span>
            <MoreHorizontal className='h-4 w-4 sm:h-5 sm:w-5' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-40 sm:w-48'>
          <DropdownMenuItem
            onClick={() => setIsViewDialogOpen(true)}
            className='flex items-center gap-2 text-green-600 text-sm sm:text-base'
          >
            <Eye className='h-4 w-4 sm:h-5 sm:w-5' />
            Ver Mais
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsDeleteDialogOpen(true)}
            className='flex items-center gap-2 text-red-600 text-sm sm:text-base'
          >
            <Trash className='h-4 w-4 sm:h-5 sm:w-5' />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Eliminação</DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <p>Tem certeza que deseja eliminar este evento?</p>
            <div className='flex justify-end gap-2'>
              <Button
                variant='outline'
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                variant='destructive'
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Eliminando...' : 'Eliminar'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes do Evento</DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <div>
              <h3 className='font-medium'>Título</h3>
              <p>{event.title}</p>
            </div>
            <div>
              <h3 className='font-medium'>Data</h3>
              <p>{event.date}</p>
            </div>
            <div>
              <h3 className='font-medium'>Local</h3>
              <p>{event.address}</p>
            </div>
            <div>
              <h3 className='font-medium'>Descrição</h3>
              <p>{event.description}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
