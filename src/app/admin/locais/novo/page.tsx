'use client'

import { AppSidebar } from '@/components/sidebar'
import { MapPin } from 'lucide-react'
import AddLocate from '@/components/forms/Locate'

export default function NovoLocalPage() {
  return (
    <AppSidebar>
      <div className='w-full min-h-screen flex items-center justify-center'>
        <div className='w-full max-w-2xl rounded-lg border-gray-200 border-2 p-8'>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center gap-2'>
              <h1 className='text-2xl font-bold flex gap-2 justify-center items-center'>
                <MapPin size={25} /> Novo Local
              </h1>
            </div>
          </div>
          <div className='w-full'>
            <AddLocate />
          </div>
        </div>
      </div>
    </AppSidebar>
  )
}
