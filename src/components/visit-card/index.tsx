import { Card, CardHeader, CardContent } from '../ui/card'

interface VisitCardProps {
  title: string
  description: string
  icon: React.ReactNode
}

export function VisitCard({ title, description, icon }: VisitCardProps) {
  return (
    <Card className='border-none shadow-none w-full flex flex-col h-full min-h-full items-center'>
      <CardHeader>
        <div className='w-20 h-20 bg-secondary rounded-full flex justify-center items-center'>
          {icon}
        </div>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <h2 className='text-lg font-bold text-center'>{title}</h2>
        <p className='text-sm text-center'>{description}</p>
      </CardContent>
    </Card>
  )
}
