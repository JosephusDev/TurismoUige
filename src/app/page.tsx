'use client'
import { Button } from '@/components/ui/button'
import AddEvaluate from '@/components/modal/AddEvaluate'
import { Coments } from '@/components/Coments'
export default function Page() {
  return (
    <div>
      <h1 className='text-xl font-medium'>Hello World</h1>
      <AddEvaluate />
      <Coments />
    </div>
  )
}
