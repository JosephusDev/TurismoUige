import { createClient } from '@/services/supabase/client'
import { EventType } from '@/services/supabase/types'
import { useMutation } from '@tanstack/react-query'

type UpdateEventProps = {
  id: string
  event: Partial<EventType>
}

export function useUpdateEvent() {
  const supabase = createClient()

  const {
    mutateAsync: updateEvent,
    isPending,
    error,
    data,
  } = useMutation({
    mutationKey: ['updateEvent'],
    mutationFn: async ({ id, event }: UpdateEventProps) => {
      const { data, error } = await supabase
        .from('event')
        .update(event)
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
    updateEvent,
    isPending,
    error,
    data,
  }
}
