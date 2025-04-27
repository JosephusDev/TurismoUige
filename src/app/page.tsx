'use client'
import { Button } from '@/components/ui/button'
import AddEvaluate from '@/components/modal/AddEvaluate'
import { Coments } from '@/components/Coments'
import { Locates, Events } from '@/components/sections'
export default function Page() {
  return (
    <div className='flex flex-col w-full'>
      <AddEvaluate />
      <Coments />
      <Locates />
      <Events />
    </div>
  )
}
