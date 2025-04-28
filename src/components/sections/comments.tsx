'use client'
import { useEffect } from 'react'
import { CarouselComment } from '../carousel-comment'
import { fetchRates } from '@/useCases/rates/fetchRates'
import { RateWithLocate } from '@/types/rate'
import { Loader2 } from 'lucide-react'
export function Comments() {
  const { data, isLoading } = fetchRates()

  if (isLoading) {
    return (
      <div className='flex justify-center items-center mb-10'>
        <Loader2 className='w-10 h-10 animate-spin text-primary' />
      </div>
    )
  }

  const comments: RateWithLocate[] = (data as RateWithLocate[]) ?? []

  return (
    <div className='p-6 md:px-[10%] flex flex-col md:flex-row justify-between gap-4'>
      <div className='flex flex-col gap-4 max-w-full md:max-w-[45%]'>
        <h1 className='text-xl lg:text-2xl font-bold'>
          Recomendados por mais de {comments.length} utilizadores!
        </h1>
        <p className='text-sm max-w-full md:max-w-[60%]'>
          Conheça Uíge de forma fácil e completa! Com nosso app, explore
          cachoeiras deslumbrantes, trilhas naturais e locais históricos com
          apenas alguns cliques. Planeje sua viagem e viva experiências
          inesquecíveis.
        </p>
      </div>
      <div>
        <CarouselComment comments={comments} />
      </div>
    </div>
  )
}
