import { HearderContent } from '@/components/headerContent'
import Map from '@/components/Map'
import { Navbar } from '@/components/navbar'
import {
  Locates,
  Events,
  WhyVisit,
  Comments,
  Footer,
} from '@/components/sections'
export default function Page() {
  return (
    <div className='flex flex-col w-full h-full'>
      <header className='relative bg-cover bg-center'>
        <div className='relative z-10 flex flex-col items-center justify-center text-center h-full'>
          <Navbar />
          <HearderContent />
        </div>
      </header>
      <main className='relative z-0'>
        <WhyVisit />
        <Locates />
        <Events />
        <Map />
        <Comments />
      </main>
      <div className='relative flex flex-col items-center justify-center text-center h-full'>
        <Footer />
      </div>
    </div>
  )
}
