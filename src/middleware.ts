import { type NextRequest } from 'next/server'
import { updateSession } from '@/services/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/',
    '/locais/:path*',
    '/admin/:path*',
    '/login',
    '/eventos/:path*',
  ],
}
