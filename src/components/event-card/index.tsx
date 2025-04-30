import { Calendar, MapPin } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/utils'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface EventCardProps {
  id: string
  title: string
  description: string
  address: string
  date: string
  className?: string
  isBlurred?: boolean
}

export function EventCard({
  title,
  description,
  address,
  date,
  className,
  isBlurred = false,
}: EventCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          className={cn(
            'group relative w-full overflow-hidden transition-all cursor-pointer',
            isBlurred && 'opacity-50',
            className,
          )}
        >
          <CardHeader className='px-4 py-8 bg-muted rounded-b-xl'>
            <CardTitle className='text-center'>{title}</CardTitle>
          </CardHeader>
          <CardContent className='p-4 flex flex-col gap-5'>
            <div className='flex flex-col gap-4'>
              <p className='flex items-center gap-1 line-clamp-2 text-sm'>
                <MapPin className='text-primary' size={16} />
                {address}
              </p>
              <div className='flex items-center gap-2'>
                <Calendar className='text-primary' size={16} />
                <span className='text-sm font-medium'>
                  {formatDate(new Date(date))}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-primary'>{title}</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='flex items-center gap-1 text-sm'>
            <MapPin size={16} />
            <span>{address}</span>
          </div>
          <div className='flex items-center gap-2 text-sm'>
            <Calendar className='h-4 w-4' />
            <span className='font-medium'>{formatDate(new Date(date))}</span>
          </div>
          <p className='text-sm text-muted-foreground'>{description}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
