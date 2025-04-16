import { createClient } from '@/services/supabase/client'
import { useMutation } from '@tanstack/react-query'

export function useDeleteImage() {
  const supabase = createClient()

  const {
    mutateAsync: deleteImage,
    isPending,
    error,
    data,
  } = useMutation({
    mutationKey: ['removeImage'],
    mutationFn: async (imageId: number) => {
      const { data, error } = await supabase
        .from('images')
        .delete()
        .eq('id', imageId)
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }

      return data
    },
  })

  return {
    deleteImage,
    isPending,
    error,
    data,
  }
}
