import Image from 'next/image'
import { Button } from '../ui/button'
import { Globe } from 'lucide-react'
import HeaderImage from '@/assets/images/header.jpg'

export function HearderContent() {
  return (
    <div className='container mx-auto flex items-center justify-between p-8 bg-white text-black'>
      <div className='flex flex-col items-start space-y-6 max-w-xl'>
        <h1 className='text-2xl font-bold text-center sm:text-left mt-20 sm:mt-0 w-full'>
          Descubra o encanto do Uíge!
        </h1>

        <p className='text-sm leading-relaxed text-justify'>
          Explore as maravilhas naturais, culturais e históricas desta terra
          rica em beleza e tradição. Descubra novas experiências em um cenário
          de cultura vibrante e natureza exuberante.
        </p>

        <Button className='flex items-center gap-2 rounded-full p-6 text-base'>
          <Globe className='w-5 h-5' />
          Explorar
        </Button>
      </div>

      <div className='hidden md:flex flex-shrink-0 w-80 h-80 relative rounded-full overflow-hidden border-4 border-primary-300 shadow-lg'>
        <Image
          src={HeaderImage}
          alt='Imagem de viagem'
          layout='fill'
          objectFit='cover'
          priority
        />
      </div>
    </div>
  )
}
