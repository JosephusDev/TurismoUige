import { createClient } from '@/services/supabase/client'
import { UserType } from '@/services/supabase/types'
import { useMutation } from '@tanstack/react-query'

type UpdateUserProps = {
  id: string
  user: Partial<UserType>
}

export function useUpdateUser() {
  const supabase = createClient()

  const {
    mutateAsync: updateUser,
    isPending,
    error,
    data,
  } = useMutation({
    mutationKey: ['updateUser'],
    mutationFn: async ({ id, user }: UpdateUserProps) => {
      const { data, error } = await supabase
        .from('users')
        .update(user)
        .eq('id', id)
        .select()
        .single()

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
