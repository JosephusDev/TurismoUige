import { createClient } from '@/services/supabase/client'
import { useMutation } from '@tanstack/react-query'
import { AuthSchema } from '@/services/supabase/types/schema'

export function useSignIn() {
  const supabase = createClient()

  const mutation = useMutation({
    mutationKey: ['signIn'],
    mutationFn: async ({ email, password }: AuthSchema) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw new Error(error.message)
      }

      return data
    },
  })

  return {
    signIn: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
  }
}
