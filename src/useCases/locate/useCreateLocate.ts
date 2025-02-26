import { createClient } from '@/services/supabase/client'
import { LocateType } from '@/services/supabase/types'
import { useMutation } from '@tanstack/react-query'

export function useCreateLocates(data: Omit<LocateType, 'id' | 'created_at'>) {
  const supabase = createClient()
  const { isPending: isLoading, error } = useMutation({
    mutationKey: ['CreateLocate'],
    mutationFn: async () => {
      const { error } = await supabase.from('location').insert(data)
      return { data, error }
    },
  })
  return {
    data,
    isLoading,
    error,
  }
}
