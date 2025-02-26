import { createClient } from '@/services/supabase/client'
import { useMutation } from '@tanstack/react-query'

export function useRemoveLocates(id: string) {
  const supabase = createClient()
  const { isPending: isLoading, error } = useMutation({
    mutationKey: ['RemoveLocate'],
    mutationFn: async () => {
      const { error } = await supabase.from('location').delete().eq('id', id)
      return { error }
    },
  })
  return {
    isLoading,
    error,
  }
}
