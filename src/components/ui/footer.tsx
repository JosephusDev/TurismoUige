import { Facebook, Twitter, Music2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='bg-gray-100 py-10 border-t text-black'>
      <div className='max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-justify'>
        <div>
          <h2 className='text-lg font-bold'>ZayaUíge</h2>
          <p className='text-sm mt-2 text-justify'>
            Explore o Uíge com facilidade! Descubra destinos, planeje sua viagem
            e viva experiências inesquecíveis.
          </p>
          <div className='flex space-x-4 mt-4'>
            <a
              href='#'
              aria-label='Facebook'
              className='bg-black rounded-full p-2 text-white'
            >
              <Facebook className='w-4 h-4' />
            </a>
            <a
              href='#'
              aria-label='TikTok'
              className='bg-black rounded-full p-2 text-white'
            >
              <Music2 className='w-4 h-4' />
            </a>
            <a
              href='#'
              aria-label='Twitter'
              className='bg-black rounded-full p-2 text-white'
            >
              <Twitter className='w-4 h-4' />
            </a>
          </div>
        </div>

        <div>
          <h3 className='font-semibold text-sm mb-2'>INSTITUCIONAL</h3>
          <ul className='space-y-1 text-sm'>
            <li>
              <Link href='#'>Sobre</Link>
            </li>
            <li>
              <Link href='#'>Carreiras</Link>
            </li>
            <li>
              <Link href='#'>Logística</Link>
            </li>
            <li>
              <Link href='#'>Privacidade</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className='font-semibold text-sm mb-2'>CONTATO</h3>
          <ul className='space-y-1 text-sm'>
            <li>
              <Link href='#'>Ajuda - FAQ</Link>
            </li>
            <li>
              <Link href='#'>Imprensa</Link>
            </li>
            <li>
              <Link href='#'>Afiliados</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className='font-semibold text-sm mb-2'>AJUDA</h3>
          <ul className='space-y-1 text-sm gap-4'>
            <li>
              <Link href='#'>Help Center</Link>
            </li>
            <li>
              <Link href='#'>Mídias</Link>
            </li>
            <li>
              <Link href='#'>Chat ao vivo</Link>
            </li>
          </ul>
        </div>
      </div>

      <hr className='border-gray-300 my-8' />

      <div className='text-center text-xs text-gray-500'>
        Copyright © - ZayaUíge - Todos os direitos reservados. 2025
      </div>
    </footer>
  )
}
