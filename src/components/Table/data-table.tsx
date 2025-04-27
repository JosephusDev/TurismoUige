'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DataTableProps {
  data: any[]
  columns: {
    header: string
    accessorKey: string
  }[]
  searchPlaceholder?: string
  addButtonText?: string
  addButtonLink?: string
}

export function DataTable({
  data,
  columns,
  searchPlaceholder = 'Pesquisar...',
  addButtonText = 'Adicionar',
  addButtonLink,
}: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const router = useRouter()

  // Filtra os dados baseado no termo de busca
  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  )

  // Calcula a paginação
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className='max-w-sm'
          />
        </div>
        {addButtonLink && (
          <Button onClick={() => router.push(addButtonLink)}>
            <Plus className='mr-2 h-4 w-4' />
            {addButtonText}
          </Button>
        )}
      </div>

      <div className='rounded-md border'>
        <table className='w-full'>
          <thead>
            <tr className='border-b bg-gray-50'>
              {columns.map(column => (
                <th
                  key={column.accessorKey}
                  className='px-4 py-2 text-left text-sm font-medium text-gray-500'
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, rowIndex) => (
              <tr key={rowIndex} className='border-b'>
                {columns.map(column => (
                  <td key={column.accessorKey} className='px-4 py-2'>
                    {row[column.accessorKey]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      <div className='flex items-center justify-between'>
        <div className='text-sm text-gray-500'>
          Mostrando {startIndex + 1} a {Math.min(endIndex, filteredData.length)}{' '}
          de {filteredData.length} resultados
        </div>
        <div className='flex space-x-2'>
          <Button
            variant='outline'
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <Button
            variant='outline'
            onClick={() =>
              setCurrentPage(prev => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}
