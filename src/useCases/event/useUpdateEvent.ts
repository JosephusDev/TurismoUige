import { createClient } from '@/services/supabase/client'
import { EventType } from '@/services/supabase/types'
import { useMutation } from '@tanstack/react-query'

export function useUpdateEvents(
  data: Omit<EventType, 'created_at'>,
  id: string,
) {
  const supabase = createClient()
  const { isPending: isLoading, error } = useMutation({
    mutationKey: ['UpdateEvent'],
    mutationFn: async () => {
      const { status, error } = await supabase
        .from('event')
        .update(data)
        .eq('id', id)
      return { status, error }
    },
  })
  return {
    isLoading,
    error,
  }
}
