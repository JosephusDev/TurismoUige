'use client'

import { useCallback, useEffect, useState, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { CardSkeleton } from '../../components/skeletons/CardSkeleton'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fetchEvents } from '@/useCases/event/fetchEvents'
import { EventCard } from '@/components/event-card'

export function Events() {
  const { data: events, isLoading, error } = fetchEvents()
  const [autoplay, setAutoplay] = useState(true)
  const autoplayRef = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }),
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
      containScroll: 'trimSnaps',
      breakpoints: {
        '(min-width: 640px)': {
          slidesToScroll: 2,
          align: 'start',
        },
        '(min-width: 768px)': {
          slidesToScroll: 3,
          align: 'start',
        },
        '(min-width: 1024px)': {
          slidesToScroll: 4,
          align: 'start',
        },
      },
    },
    [autoplayRef.current],
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev()
      setAutoplay(false)
    }
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext()
      setAutoplay(false)
    }
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const autoplayPlugin = emblaApi.plugins().autoplay
    if (!autoplayPlugin) return

    try {
      if (autoplay) {
        autoplayPlugin.play()
      } else {
        autoplayPlugin.stop()
      }
    } catch (error) {
      console.error('Erro ao controlar autoplay:', error)
    }
  }, [emblaApi, autoplay])

  if (isLoading) return <CardSkeleton />

  if (error) {
    return (
      <div className='flex h-[50vh] w-full items-center justify-center'>
        <p className='text-center text-lg text-destructive'>
          Erro ao carregar os eventos. Por favor, tente novamente mais tarde.
        </p>
      </div>
    )
  }

  if (!events) return null

  return (
    <div className='m-4 md:m-4 flex flex-col items-center w-full max-w-full overflow-hidden relative'>
      <div className='mb-8 text-center w-full'>
        <h1 className='text-lg sm:text-2xl font-bold'>Eventos em Destaque</h1>
        <p className='text-xs sm:text-sm mt-2 text-muted-foreground'>
          Descubra os melhores eventos do Uíge e planeje sua próxima aventura!
        </p>
      </div>

      <div className='flex flex-col w-full max-w-full px-4 relative'>
        <div className='overflow-hidden' ref={emblaRef}>
          <div className='flex gap-6 px-6'>
            {events.map(event => {
              return (
                <div
                  key={event.id}
                  className={`flex-[0_0_85%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_22%] max-w-[300px] transition-opacity duration-300`}
                >
                  <EventCard
                    id={event.id}
                    title={event.title}
                    description={event.description}
                    address={event.address}
                    date={event.date}
                    isBlurred={false}
                  />
                </div>
              )
            })}
          </div>
        </div>
        <div className='flex gap-2 justify-center mt-16'>
          <Button
            variant='ghost'
            size='icon'
            className='-translate-y-1/2 z-10'
            onClick={scrollPrev}
          >
            <ChevronLeft className='h-6 w-6' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            className='-translate-y-1/2 z-10'
            onClick={scrollNext}
          >
            <ChevronRight className='h-6 w-6' />
          </Button>
        </div>
      </div>
    </div>
  )
}
