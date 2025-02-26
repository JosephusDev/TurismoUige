import { createClient } from '@/services/supabase/client'

export async function useSignOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
}
