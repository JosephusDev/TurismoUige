'use client'
import { HearderContent } from '@/components/headerContent'
import { Navbar } from '@/components/navbar'
import Footer from '@/components/ui/footer'
import { Locates, Events, WhyVisit, Comments } from '@/components/sections'

export default function Page() {
  return (
    <div className='flex flex-col w-full'>
      <header className='relative bg-cover bg-center h-[400px]'>
        <div className='relative z-10 flex flex-col items-center justify-center text-center text-white h-full'>
          <Navbar />
          <HearderContent />
        </div>
      </header>
      <WhyVisit />
      <Locates />
      <Events />
      <Comments />
      <div className='relative z-10 flex flex-col items-center justify-center text-center text-white h-full'>
        <Footer />
      </div>
    </div>
  )
}
