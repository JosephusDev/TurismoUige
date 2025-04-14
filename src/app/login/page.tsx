import { LoginPage } from '@/components/login'
import { createClient } from '@/services/supabase/client'

export default async function Page() {
  return (
    <div>
      <LoginPage />
    </div>
  )
}
