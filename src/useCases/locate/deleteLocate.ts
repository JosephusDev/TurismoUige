import { createClient } from '@/services/supabase/client'
import { useMutation } from '@tanstack/react-query'

export function useDeleteLocate() {
  const supabase = createClient()

  const {
    mutateAsync: deleteLocate,
    isPending,
    error,
    data,
  } = useMutation({
    mutationKey: ['removeLocate'],
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('location')
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
    deleteLocate,
    isPending,
    error,
    data,
  }
}
