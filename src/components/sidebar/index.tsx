'use server'
import { Calendar, LogOut, MapPin, User } from 'lucide-react'
import { createClient } from '@/services/supabase/server'
import { redirect } from 'next/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar'
import { Fragment } from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'

// Menu items.
const items = [
  {
    title: 'Locais',
    url: '/admin',
    icon: MapPin,
  },
  {
    title: 'Eventos',
    url: '/admin/eventos',
    icon: Calendar,
  },
  {
    title: 'Minha Conta',
    url: '/admin/perfil',
    icon: User,
  },
]

export async function AppSidebar({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  async function handleLogout() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/')
  }
  return (
    <Fragment>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className='mb-5 text-lg font-bold'>
              Zaya Uige
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map(item => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className='hover:text-primary transition-all duration-300'
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <form action={handleLogout}>
                <Button
                  variant={'ghost'}
                  className='w-full hover:text-primary transition-all duration-300'
                  type='submit'
                >
                  <LogOut />
                  <span>Terminar Sessão</span>
                </Button>
              </form>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <SidebarTrigger />
        {children}
      </SidebarInset>
    </Fragment>
  )
}
