import Image from 'next/image'
import Link from 'next/link'
import { Eye, MapPin, Star } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { PlaceholderImage } from '@/components/ui/placeholder-image'
import { Button } from '../ui/button'
import { CategoryBadge } from '../ui/category-badge'
import { Category } from '@/services/supabase/types'

interface LocateCardProps {
  id: string
  name: string
  address: string
  category: Category
  imageUrl?: string
  rating: number
  total_rates: number
  className?: string
  isBlurred?: boolean
}

export function LocateCard({
  id,
  name,
  address,
  category,
  imageUrl,
  rating,
  total_rates,
  className,
  isBlurred = false,
}: LocateCardProps) {
  return (
    <Link href={`/locais/${id}`}>
      <Card
        className={cn(
          'group relative w-full overflow-hidden transition-all',
          isBlurred && 'opacity-50',
          className,
        )}
      >
        <div className='relative h-[200px] w-full overflow-hidden'>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className='rounded-b-2xl object-cover transition-transform group-hover:scale-105'
            />
          ) : (
            <PlaceholderImage />
          )}
        </div>

        <CardContent className='p-4 flex justify-between gap-5'>
          <div className='flex flex-col gap-4'>
            <h3 className='font-semibold text-base max-w-[150px] truncate'>
              {name}
            </h3>
            <CategoryBadge className='w-fit' category={category} />
            <p className='flex items-center gap-1 line-clamp-2 text-sm'>
              <MapPin size={16} />
              {address}
            </p>
          </div>
          <div className='flex flex-col gap-4'>
            <div className='flex justify-center items-center gap-2'>
              <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
              <span className='text-sm font-medium'>{rating.toFixed(1)}</span>
              <span className='text-xs text-muted-foreground'>
                ({total_rates})
              </span>
            </div>
            <div className='flex justify-end gap-2'>
              <Button className='rounded-full p-0 w-8 h-8'>
                <Star className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
