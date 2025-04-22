'use client'
import { DataTable } from '.'
import AddLocate from '../modal/AddLocate'
import { columns } from './columns/locates'
import { fetchLocates } from '@/useCases/locate'
import { TableSkeleton } from '../skeletons/TableLocatesSkeleton'

export default function TableLocates() {
  const { data, isLoading } = fetchLocates()

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
          actionButton={<AddLocate />}
        />
      )}
    </div>
  )
}
