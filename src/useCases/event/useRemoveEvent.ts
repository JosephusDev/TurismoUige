import { createClient } from '@/services/supabase/client'
import { useMutation } from '@tanstack/react-query'

export function useRemoveEvents(id: string) {
  const supabase = createClient()
  const { isPending: isLoading, error } = useMutation({
    mutationKey: ['RemoveEvent'],
    mutationFn: async () => {
      const { error } = await supabase.from('event').delete().eq('id', id)
      return { error }
    },
  })
  return {
    isLoading,
    error,
  }
}
