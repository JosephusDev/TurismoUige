'use client'

import { ColumnDef } from '@tanstack/react-table'
import { formatDate } from '@/utils'
import { Button } from '../../ui/button'
import { toast } from 'sonner'
import { Trash, Eye, Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useDeleteEvent } from '@/useCases/event/deleteEvent'
import { useQueryClient } from '@tanstack/react-query'
import type { EventSchema } from '@/services/supabase/types/schema'

export const columns: ColumnDef<EventSchema>[] = [
  {
    accessorKey: 'title',
    header: 'Nome',
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row }) => {
      return <p>{formatDate(new Date(row.original.date))}</p>
    },
  },
  {
    accessorKey: 'address',
    header: 'Local',
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      const event = row.original
      const queryClient = useQueryClient()
      const { deleteEvent, isPending } = useDeleteEvent()

      const handleDelete = async () => {
        try {
          await deleteEvent(event.id!)
          toast.success('Evento eliminado com sucesso!')
          queryClient.invalidateQueries({ queryKey: ['event'] })
        } catch (error) {
          toast.error('Erro ao eliminar evento')
          console.error('Erro ao eliminar evento:', error)
        }
      }

      return (
        <div className='flex gap-2'>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='ghost' size='icon'>
                <Eye className='h-4 w-4' />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Detalhes do Evento</DialogTitle>
              </DialogHeader>
              <div className='space-y-4'>
                <p className='text-sm'>{event.description}</p>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant='ghost' size='icon'>
                <Trash className='h-4 w-4' />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmar Eliminação</DialogTitle>
              </DialogHeader>
              <div className='space-y-4'>
                <p>Tem certeza que deseja eliminar este evento?</p>
                <div className='flex justify-end gap-2'>
                  <Button
                    variant='destructive'
                    onClick={handleDelete}
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Loader2 className='h-4 w-4 animate-spin' />
                    ) : (
                      'Eliminar'
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )
    },
  },
]
