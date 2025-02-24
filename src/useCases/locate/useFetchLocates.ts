import { supabase } from '@/services/supabase/client'
import { useQuery } from '@tanstack/react-query'

export function useFetchLocates() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['locate'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('location')
        .select('*')
        .order('name')
      return { data, error }
    },
  })
  return {
    data,
    isLoading,
    error,
  }
}
