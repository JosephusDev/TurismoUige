import { createClient } from '@/services/supabase/client'
import { useMutation } from '@tanstack/react-query'
import { deleteImage } from '@/services/supabase/storage/delete'

export function useDeleteLocate() {
  const supabase = createClient()

  const {
    mutateAsync: deleteLocate,
    isPending,
    error,
    data,
    isSuccess,
  } = useMutation({
    mutationKey: ['removeLocate'],
    mutationFn: async (id: string) => {
      // Buscar todas as imagens do local
      const { data: images, error: imagesError } = await supabase
        .from('images')
        .select('url')
        .eq('locate_id', id)

      if (imagesError) {
        throw new Error(imagesError.message)
      }

      // Eliminar todas as imagens do storage
      if (images) {
        for (const image of images) {
          await deleteImage(image.url)
        }
      }

      // Eliminar o local
      const { data, error } = await supabase
        .from('locate')
        .delete()
        .eq('id', id)

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
    isSuccess,
  }
}
