'use client'

import { DataTable } from '@/components/Table/DataTable'

// Dados de exemplo
const eventos = [
  {
    id: 1,
    nome: 'Festival de Música',
    data: '2024-05-15',
    local: 'Centro Cultural',
    status: 'Ativo',
  },
  {
    id: 2,
    nome: 'Feira de Artesanato',
    data: '2024-06-20',
    local: 'Praça Central',
    status: 'Ativo',
  },
  {
    id: 3,
    nome: 'Exposição de Arte',
    data: '2024-07-10',
    local: 'Museu Municipal',
    status: 'Pendente',
  },
  {
    id: 4,
    nome: 'Festival Gastronômico',
    data: '2024-08-05',
    local: 'Parque da Cidade',
    status: 'Ativo',
  },
  {
    id: 5,
    nome: 'Show de Dança',
    data: '2024-09-15',
    local: 'Teatro Municipal',
    status: 'Pendente',
  },
]

const columns = [
  {
    header: 'Nome',
    accessorKey: 'nome',
  },
  {
    header: 'Data',
    accessorKey: 'data',
  },
  {
    header: 'Local',
    accessorKey: 'local',
  },
  {
    header: 'Status',
    accessorKey: 'status',
  },
]

export default function EventosPage() {
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6'>Eventos</h1>
      <DataTable
        data={eventos}
        columns={columns}
        searchPlaceholder='Pesquisar eventos...'
        addButtonText='Novo Evento'
        addButtonLink='/dashboard/eventos/novo'
      />
    </div>
  )
}
