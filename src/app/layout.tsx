import type { Metadata } from 'next'
import { Montserrat, Poppins } from 'next/font/google'
import './globals.css'
import QueryProvider from './queryProvider'
import { Toaster } from 'sonner'
import { SidebarProvider } from '@/components/ui/sidebar'
const poppinsSans = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Turismo Uige',
  description: 'Website de turismo da província do Uíge',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt' className={`${poppinsSans.variable}`}>
      <body className='font-[family-name:var(--font-poppins)]'>
        <QueryProvider>
          <SidebarProvider>{children}</SidebarProvider>
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  )
}
