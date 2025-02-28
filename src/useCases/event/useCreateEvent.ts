import { createClient } from '@/services/supabase/client'
import type { EventType } from '@/services/supabase/types'
import { useMutation } from '@tanstack/react-query'

export function useCreateEvents(data: Omit<EventType, 'id' | 'created_at'>) {
  const supabase = createClient()
  const { isPending: isLoading, error } = useMutation({
    mutationKey: ['CreateEvent'],
    mutationFn: async () => {
      const { error } = await supabase.from('event').insert(data)
      return { data, error }
    },
  })
  return {
    data,
    isLoading,
    error,
  }
}
