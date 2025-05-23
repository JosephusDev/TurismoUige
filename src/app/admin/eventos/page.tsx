'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/table'
import { Plus } from 'lucide-react'
import { fetchEvents } from '@/useCases/event'
import { AppSidebar } from '@/components/sidebar'
import { TableSkeleton } from '@/components/skeletons/TableSkeleton'
import { columns } from '@/components/table/columns/events'

export default function EventsPage() {
  const router = useRouter()
  const { data: events, isLoading } = fetchEvents()

  return (
    <AppSidebar>
      <div className='m-8 sm:m-16'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold mb-4'>Eventos</h1>
        </div>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <DataTable
            columns={columns}
            data={events!}
            filterColumn='title'
            placeholder='Buscar eventos...'
            actionButton={
              <Button onClick={() => router.push('/admin/eventos/novo')}>
                <Plus className='h-4 w-4' />
                Adicionar
              </Button>
            }
          />
        )}
      </div>
    </AppSidebar>
  )
}
