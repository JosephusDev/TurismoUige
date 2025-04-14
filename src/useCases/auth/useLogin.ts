import { createClient } from '@/services/supabase/client'
import { AuthSchema } from '@/services/supabase/types/schema'

export async function useLogin(user: AuthSchema) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithPassword(user)

  if (error) {
    throw new Error(error.message)
  }

  return data
}
