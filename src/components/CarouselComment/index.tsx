'use client'
import {
  ChevronRight,
  ChevronLeft,
  Star,
  MapPinCheckInside,
} from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '../ui/carousel'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'

interface CarouselCommentProps {
  comments: {
    comment: string | null
    created_at: string
    id: string
    locate_id: string
    value: number
    locate: {
      id: string
      name: string | null
    }
  }[]
}

export function CarouselComment({ comments }: CarouselCommentProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const handleNext = () => {
    api?.scrollNext()
  }

  const handlePrevious = () => {
    api?.scrollPrev()
  }

  return (
    <Carousel setApi={setApi} className='max-w-[500px]'>
      <CarouselContent>
        {comments?.map(comment => (
          <CarouselItem key={comment.id}>
            <Card className='w-full h-full max-w-[500px] p-6 rounded-3xl border-none bg-muted'>
              <CardContent>
                <div className='flex flex-row gap-4 justify-between mb-4'>
                  <div className='flex items-center gap-1'>
                    <MapPinCheckInside size={15} />
                    <p>{comment.locate.name}</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <h1>{comment.value}</h1>
                    {Array.from({ length: 5 }).map((_, index) =>
                      index < comment.value ? (
                        <Star
                          key={index}
                          size={16}
                          className='text-yellow-500'
                        />
                      ) : (
                        <Star key={index} size={16} />
                      ),
                    )}
                  </div>
                </div>
                <div>
                  <p className='text-sm text-justify italic'>
                    "{comment.comment}"
                  </p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className='flex items-center gap-2 justify-end mt-2'>
        <Button
          onClick={handlePrevious}
          variant='outline'
          className='rounded-full w-10 h-10'
          disabled={!api?.canScrollPrev()}
        >
          <ChevronLeft size={20} />
        </Button>
        <Button
          onClick={handleNext}
          variant='outline'
          className='rounded-full w-10 h-10'
          disabled={!api?.canScrollNext()}
        >
          <ChevronRight size={20} />
        </Button>
      </div>
    </Carousel>
  )
}
