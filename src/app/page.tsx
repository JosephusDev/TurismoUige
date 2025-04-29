import { HearderContent } from '@/components/headerContent'
import { Navbar } from '@/components/navbar'
import Footer from '@/components/ui/footer'
export default function Page() {
  return (
    <header className='relative bg-cover bg-center h-[400px]'>
      <div className='relative z-10 flex flex-col items-center justify-center text-center text-white h-full'>
        <Navbar />
        <HearderContent />
      </div>
      <div className='relative z-10 flex flex-col items-center justify-center text-center text-white h-full'>
        <Footer />
      </div>
    </header>
  )
}
