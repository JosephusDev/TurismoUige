import { Card, CardHeader, CardContent } from '../ui/card'

interface VisitCardProps {
  title: string
  description: string
  icon: React.ReactNode
}

export function VisitCard({ title, description, icon }: VisitCardProps) {
  return (
    <Card className='border-none shadow-none w-[90%] lg:w-[600px] max-w-[350px] flex flex-col h-full min-h-full items-center'>
      <CardHeader>
        <div className='w-24 h-24 bg-purple-800 rounded-full flex justify-center items-center'>
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
