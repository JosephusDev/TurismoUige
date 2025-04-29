import Image from 'next/image'
import { Button } from '../ui/button'
import { Globe, Search } from 'lucide-react'

export function HearderContent() {
  return (
    <div className='container mx-auto flex items-center justify-between p-8 bg-white text-black'>
      <div className='flex flex-col items-start space-y-6 max-w-xl'>
        <h1 className='text-4xl font-bold text-left'>
          Descubra o encanto do Uíge!
        </h1>

        <p className='text-lg leading-relaxed text-justify'>
          Explore as maravilhas naturais, culturais e históricas desta terra
          rica em beleza e tradição. Descubra novas experiências em um cenário
          de cultura vibrante e natureza exuberante.
        </p>

        <Button className='flex items-center gap-2 rounded-full px-6 py-3 text-base'>
          <Globe className='w-5 h-5' />
          Explorar
        </Button>
      </div>

      <div className='flex-shrink-0 w-40 h-40 relative rounded-full overflow-hidden border-4 border-primary-300 shadow-lg'>
        <Image
          src=''
          alt='Imagem de viagem'
          layout='fill'
          objectFit='cover'
          priority
        />
      </div>
    </div>
  )
}
