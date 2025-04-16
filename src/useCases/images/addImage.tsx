import { createClient } from '@/services/supabase/client'
import { ImageType } from '@/services/supabase/types'
import { useMutation } from '@tanstack/react-query'

export function useAddImage() {
  const supabase = createClient()

  const {
    mutateAsync: createImage,
    isPending,
    error,
    data,
    isSuccess,
  } = useMutation({
    mutationKey: ['addImage'],
    mutationFn: async (image: Pick<ImageType, 'url' | 'locate_id'>) => {
      const { data, error } = await supabase
        .from('images')
        .insert(image)
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }

      return data
    },
  })

  return {
    createImage,
    isPending,
    error,
    data,
    isSuccess,
  }
}
