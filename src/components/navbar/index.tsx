'use client'

import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Menu, Search } from 'lucide-react'

export function Navbar() {
  return (
    <>
      <header className='w-full fixed top-0 left-0 z-50 bg-white backdrop-blur-md shadow-sm'>
        <div className='container mx-auto flex items-center justify-between py-4 px-6'>
          {/* Logo */}
          <Link
            href='/'
            className='text-2xl text-secundary font-extrabold tracking-wide'
          >
            ZayaUige
          </Link>

          {/* Desktop Menu */}
          <div className='hidden md:flex items-center justify-center flex-grow'>
            <NavigationMenu>
              <NavigationMenuList className='flex space-x-8'>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href='/' className='text-secundary'>
                      Inicio
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href='#locais' className='text-secundary'>
                      Locais
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href='#eventos' className='text-secundary'>
                      Eventos
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href='#contactos' className='text-secundary'>
                      Contactos
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu */}
          <div className='flex md:hidden gap-4'>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon' className='h-9 w-9 p-0'>
                  <Menu className='h-5 w-5' />
                </Button>
              </SheetTrigger>
              <SheetContent side='top' className='w-full p-6'>
                <div className='flex flex-col gap-6'>
                  {/* Links Mobile */}
                  <NavigationMenu>
                    <NavigationMenuList className='flex flex-col items-start space-y-4'>
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <Link href='/'>Inicio</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <Link href='#locais'>Locais</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <Link href='#eventos'>Eventos</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <Link href='#contactos'>Contactos</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                  {/* Campo de busca no Mobile */}
                  <div className='flex flex-col gap-4'>
                    <Input
                      type='text'
                      placeholder='Digite o que procura...'
                      className='w-full border-gray-300 focus:border-black focus:ring-0 rounded-lg'
                    />
                    <Button
                      variant='default'
                      className='flex items-center gap-2 rounded-full px-6 py-3 text-base'
                    >
                      <Search className='w-5 h-5' />
                      Pesquisar
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Barra de Pesquisa - Desktop */}
      <div className='hidden md:block w-full mt-[140px] mb-8'>
        <div className='container mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-4'>
          <Input
            type='text'
            placeholder='Digite o que procura...'
            className='w-full md:w-1/2 border-gray-300 focus:border-black focus:ring-0 rounded-lg'
          />
          <Button
            variant='default'
            className='w-full md:w-auto flex items-center gap-2 rounded-lg'
          >
            <Search className='h-4 w-4' />
            Pesquisar
          </Button>
        </div>
      </div>
    </>
  )
}
