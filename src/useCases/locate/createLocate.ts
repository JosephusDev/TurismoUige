import { createClient } from '@/services/supabase/client'
import { LocateType } from '@/services/supabase/types'
import { useMutation } from '@tanstack/react-query'

export function useCreateLocate() {
  const supabase = createClient()

  const {
    mutateAsync: createLocate,
    isPending,
    error,
    data,
    isSuccess,
  } = useMutation({
    mutationKey: ['createLocate'],
    mutationFn: async (locate: Partial<LocateType>) => {
      const { data, error } = await supabase
        .from('locate')
        .insert(locate)
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }

      return data
    },
  })

  return {
    createLocate,
    isPending,
    error,
    data,
    isSuccess,
  }
}
