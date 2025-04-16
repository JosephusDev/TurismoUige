'use client'
import { DataTable } from '.'
import AddLocate from '../modal/AddLocate'
import { columns } from './columns/locates'
import { fetchLocates } from '@/useCases/locate'
import { Loader2 } from 'lucide-react'

export default function TableLocates() {
  const { data, isLoading } = fetchLocates()
  if (isLoading)
    return <Loader2 size={30} className='animate-spin text-primary' />
  return (
    <div className='w-full'>
      <DataTable
        showFilter
        filterColumn='name'
        columns={columns}
        data={data?.data!}
        actionButton={<AddLocate />}
      />
    </div>
  )
}
