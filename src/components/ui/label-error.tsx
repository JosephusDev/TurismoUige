import { cn } from '@/lib/utils'

interface LabelErrorProps {
  message?: string
}

export function LabelError({ message }: LabelErrorProps) {
  if (!message) return null

  return <p className='text-sm font-medium text-destructive'>* {message}</p>
}
