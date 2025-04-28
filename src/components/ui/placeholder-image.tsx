import { ImageIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface PlaceholderImageProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function PlaceholderImage({
  className,
  ...props
}: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center bg-muted',
        className,
      )}
      {...props}
    >
      <ImageIcon className='h-8 w-8 text-muted-foreground' />
    </div>
  )
}
