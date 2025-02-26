import { createClient } from '@/services/supabase/client'
import { useMutation } from '@tanstack/react-query'
import { AuthSchema } from '@/services/supabase/types/schema' // Altere para o schema correto

export function useSignUp() {
  const supabase = createClient()

  const mutation = useMutation({
    mutationKey: ['signUp'],
    mutationFn: async ({ email, password }: AuthSchema) => {
      const { data, error } = await supabase.auth.signUp({
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
    signUp: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
  }
}
