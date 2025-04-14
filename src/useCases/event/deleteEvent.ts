import { createClient } from '@/services/supabase/client'
import { useMutation } from '@tanstack/react-query'

export function useDeleteEvent() {
  const supabase = createClient()

  const {
    mutateAsync: deleteEvent,
    isPending,
    error,
    data,
  } = useMutation({
    mutationKey: ['deleteEvent'],
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('event')
        .delete()
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
    deleteEvent,
    isPending,
    error,
    data,
  }
}
