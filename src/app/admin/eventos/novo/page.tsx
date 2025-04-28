'use client'

import { AddEvent } from '@/components/forms/Event'
import { AppSidebar } from '@/components/sidebar'
import { Calendar } from 'lucide-react'

export default function NovoEventoPage() {
  return (
    <AppSidebar>
      <div className='w-full min-h-screen flex items-center justify-center'>
        <div className='w-full max-w-2xl rounded-lg border-gray-200 border-2 p-8'>
          <div className='flex items-center mb-6 gap-2'>
            <Calendar size={24} />
            <h1 className='text-2xl font-bold'>Novo Evento</h1>
          </div>
          <AddEvent />
        </div>
      </div>
    </AppSidebar>
  )
}
