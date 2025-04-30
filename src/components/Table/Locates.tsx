'use client'
import { Button } from '../ui/button'
import { fetchLocates } from '@/useCases/locate'
import { TableSkeleton } from '../skeletons/TableSkeleton'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import { DataTable } from '.'
import { columns } from './columns/locates'

export function TableLocates() {
  const { data, isLoading } = fetchLocates()
  const router = useRouter()

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold mb-4'>Locais</h1>
      </div>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <DataTable
          showFilter
          filterColumn='name'
          columns={columns}
          data={data!}
          actionButton={
            <Button onClick={() => router.push('/admin/locais/novo')}>
              <Plus className='h-4 w-4' />
              <span className='hidden sm:block'>Adicionar</span>
            </Button>
          }
        />
      )}
    </div>
  )
}
