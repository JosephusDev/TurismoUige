import { createClient } from '@/services/supabase/client'
import { useQuery } from '@tanstack/react-query'

const supabase = createClient()

export function fetchImages(locateId: string) {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['images', locateId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('images')
        .select('url')
        .eq('locate_id', locateId)
        .order('created_at', { ascending: false })
      return { data, error }
    },
  })
  return {
    data: data?.data,
    isLoading,
    error,
    isSuccess,
  }
}
