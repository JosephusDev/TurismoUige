import { createClient } from '@/services/supabase/client'
import { EventType } from '@/services/supabase/types'
import { useMutation } from '@tanstack/react-query'

export function useCreateEvent() {
  const supabase = createClient()

  const {
    mutateAsync: createEvent,
    isPending,
    error,
    data,
  } = useMutation({
    mutationKey: ['createEvent'],
    mutationFn: async (event: Omit<EventType, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('event')
        .insert(event)
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }

      return data
    },
  })

  return {
    createEvent,
    isPending,
    error,
    data,
  }
}
