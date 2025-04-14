import { createClient } from '@/services/supabase/client'
import { LocateType } from '@/services/supabase/types'
import { useMutation } from '@tanstack/react-query'

type UpdateLocateProps = {
  id: string
  locate: Partial<LocateType>
}

export function useUpdateLocate() {
  const supabase = createClient()

  const {
    mutateAsync: updateLocate,
    isPending,
    error,
    data,
  } = useMutation({
    mutationKey: ['updateLocate'],
    mutationFn: async ({ id, locate }: UpdateLocateProps) => {
      const { data, error } = await supabase
        .from('location')
        .update(locate)
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
    updateLocate,
    isPending,
    error,
    data,
  }
}
