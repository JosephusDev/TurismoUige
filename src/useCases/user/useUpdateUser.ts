import { createClient } from '@/services/supabase/client'
import { UserType } from '@/services/supabase/types'
import { useMutation } from '@tanstack/react-query'

export function useUpdateUser(
  data: Pick<UserType, 'user_name' | 'avatar_url'>,
  id: string,
) {
  const supabase = createClient()
  const { isPending: isLoading, error } = useMutation({
    mutationKey: ['UpdateUser'],
    mutationFn: async () => {
      const { data: updatedUser, error } = await supabase
        .from('users')
        .update(data)
        .eq('id', id)
      return updatedUser
    },
  })
  return {
    isLoading,
    error,
  }
}
