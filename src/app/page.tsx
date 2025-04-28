'use client'
import { Locates, Events, WhyVisit, Comments } from '@/components/sections'

export default function Page() {
  return (
    <div className='flex flex-col w-full'>
      <WhyVisit />
      <Locates />
      <Events />
      <Comments />
    </div>
  )
}
