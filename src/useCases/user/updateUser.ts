import { createClient } from '@/services/supabase/client'
import { UserSchema } from '@/services/supabase/types/schema'
import { useMutation } from '@tanstack/react-query'

export function useUpdateUser() {
  const supabase = createClient()

  const {
    mutateAsync: updateUser,
    isPending,
    error,
    data,
  } = useMutation({
    mutationKey: ['updateUser'],
    mutationFn: async ({ user }: { user: UserSchema }) => {
      const { data, error } = await supabase.auth.updateUser(user)

      if (error) {
        throw new Error(error.message)
      }

      return data
    },
  })

  return {
    updateUser,
    isPending,
    error,
    data,
  }
}
