import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserratSans = Montserrat({
  variable: '--font-geist-sans',
  subsets: ['latin'],
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
    <html lang='pt' className={`${montserratSans.variable}`}>
      <body className='font-[family-name:var(--font-geist-sans)]'>
        {children}
      </body>
    </html>
  )
}
