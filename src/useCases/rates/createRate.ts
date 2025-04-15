import { createClient } from '@/services/supabase/client'
import { RateType } from '@/services/supabase/types'
import { useMutation } from '@tanstack/react-query'

export function useCreateRate() {
  const supabase = createClient()

  const {
    mutateAsync: createRate,
    isPending,
    error,
    data,
  } = useMutation({
    mutationKey: ['createRate'],
    mutationFn: async (rate: Omit<RateType, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('rate')
        .insert(rate)
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }

      return data
    },
  })

  return {
    createRate,
    isPending,
    error,
    data,
  }
}
