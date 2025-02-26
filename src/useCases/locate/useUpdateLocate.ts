import { createClient } from '@/services/supabase/client'
import { LocateType } from '@/services/supabase/types'
import { useMutation } from '@tanstack/react-query'

export function useUpdateLocates(
  data: Omit<LocateType, 'created_at'>,
  id: string,
) {
  const supabase = createClient()
  const { isPending: isLoading, error } = useMutation({
    mutationKey: ['UpdateLocate'],
    mutationFn: async () => {
      const { status, error } = await supabase
        .from('location')
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
