'use client'
import { useEffect } from 'react'
import { CarouselComment } from '../CarouselComment'
import { fetchRates } from '@/useCases/rates/fetchRates'
import { RateWithLocate } from '@/types/rate'

export function Coments() {
  const { data, isLoading } = fetchRates()

  useEffect(() => {
    console.log('DATA ', data)
  }, [data])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const comments: RateWithLocate[] = (data as RateWithLocate[]) ?? []

  return (
    <div className='p-6 md:px-[10%] flex flex-col md:flex-row justify-between gap-4'>
      <div className='flex flex-col gap-4 max-w-full md:max-w-[45%]'>
        <h1 className='text-3xl lg:text-5xl font-bold'>
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
