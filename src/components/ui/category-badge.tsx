import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Category } from '@/services/supabase/types'

interface CategoryBadgeProps {
  category: Category
  className?: string
}

const categoryColors: Record<Category, string> = {
  restaurante: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
  hotel: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  banco: 'bg-green-100 text-green-800 hover:bg-green-200',
  natureza: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200',
  loja: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <Badge
      variant='secondary'
      className={cn('capitalize', categoryColors[category], className)}
    >
      {category}
    </Badge>
  )
}
