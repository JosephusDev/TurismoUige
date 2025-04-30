'use client'

import { fetchLocateById } from '@/useCases/locate/fetchLocates'
import { fetchImages } from '@/useCases/images/fetchImages'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'
import Image from 'next/image'
import { MapPin, Star } from 'lucide-react'
import { LocateDetailsSkeleton } from '@/components/skeletons/LocateDetailsSkeleton'

export default function LocateDetails({ id }: { id: string }) {
  const { data: locate, isLoading, error } = fetchLocateById(id)
  const { data: images } = fetchImages(id)
  const autoplayRef = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  )
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [autoplayRef.current],
  )

  if (isLoading) return <LocateDetailsSkeleton />
  if (error) return <div>Erro ao carregar os dados</div>

  return (
    <div className='min-h-screen w-full bg-background'>
      <div className='w-full h-[200px] md:h-[300px] relative overflow-hidden'>
        <div className='overflow-hidden h-full' ref={emblaRef}>
          <div className='flex h-full'>
            {images?.map((image, index) => (
              <div key={index} className='flex-[0_0_100%] min-w-0 relative'>
                <Image
                  src={image.url}
                  alt={`Imagem ${index + 1} de ${locate?.name}`}
                  fill
                  className='object-cover'
                  priority
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4 justify-center items-center px-4 py-8'>
        <h1 className='text-2xl sm:text-3xl font-bold'>{locate?.name}</h1>
        <div className='flex gap-4'>
          <div className='flex items-center gap-2'>
            <MapPin className='h-4 w-4' />
            <span>{locate?.address}</span>
          </div>
          <div className='flex items-center gap-2'>
            <Star className='h-4 w-4 text-yellow-500' />
            <span>{locate?.average_rating?.toFixed(1)}</span>
            <span className='text-muted-foreground'>
              ({locate?.total_rates} avaliações)
            </span>
          </div>
        </div>
        <div className='mx-2 sm:mx-8 mt-4'>
          <p className='text-justify'>{locate?.description}</p>
        </div>
      </div>
    </div>
  )
}
