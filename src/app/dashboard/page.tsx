'use client'

import { MapPin, Calendar, Menu } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/Table'
import { EventActions } from '@/components/Table/EventActions'
import { Plus } from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'
import { useFetchEvents } from '@/useCases/event'
import { Loader2 } from 'lucide-react'

type Event = {
  id: string
  title: string
  date: string
  address: string
  description: string
}

const columns: ColumnDef<Event>[] = [
  {
    accessorKey: 'title',
    header: 'Nome',
  },
  {
    accessorKey: 'date',
    header: 'Data',
  },
  {
    accessorKey: 'address',
    header: 'Local',
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      return <EventActions event={row.original} />
    },
  },
]

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const router = useRouter()
  const { data: events, isLoading } = useFetchEvents()

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-primary' />
      </div>
    )
  }

  return (
    <div className='flex h-screen bg-gray-100'>
      {/* Sidebar */}
      <div
        className={`bg-white shadow-md transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} fixed h-screen`}
      >
        <div className='p-4'>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className='p-2 rounded-lg hover:bg-gray-100'
          >
            <Menu className='w-6 h-6' />
          </button>
        </div>

        <nav className='mt-4'>
          <ul className='space-y-2 px-4'>
            <li>
              <a
                href='#'
                className='flex items-center p-2 rounded-lg hover:bg-gray-100'
              >
                <MapPin className='w-5 h-5' />
                {isSidebarOpen && <span className='ml-3'>Locais</span>}
              </a>
            </li>
            <li>
              <button
                onClick={() => router.push('/dashboard/eventos')}
                className='flex items-center w-full p-2 rounded-lg hover:bg-gray-100'
              >
                <Calendar className='w-5 h-5' />
                {isSidebarOpen && <span className='ml-3'>Eventos</span>}
              </button>
            </li>
          </ul>
        </nav>

        {/* Profile Section */}
        <div className='absolute bottom-0 w-full p-4 border-t'>
          <div className='flex items-center'>
            <div className='w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white'>
              JD
            </div>
            {isSidebarOpen && (
              <div className='ml-3'>
                <p className='text-sm font-medium'>John Doe</p>
                <p className='text-xs text-gray-500'>Admin</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main
        className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} p-8 transition-all duration-300`}
      >
        <div className='space-y-6'>
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-bold'>Eventos</h1>
            <Button onClick={() => router.push('/dashboard/eventos/novo')}>
              <Plus className='h-4 w-4 mr-2' />
              Adicionar Evento
            </Button>
          </div>

          <DataTable
            columns={columns}
            data={events?.data || []}
            filterColumn='title'
            placeholder='Buscar eventos...'
          />
        </div>
      </main>
    </div>
  )
}
