import { createClient } from '@/services/supabase/client'
import { useQuery } from '@tanstack/react-query'



export function useFetchEvents() {
  const supabase = createClient()
  const { data, isLoading, error } = useQuery({
    queryKey: ['event'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('event')
        .select('*')
        .order('date')
      return { data, error }
    },
  })
  return {
    data,
    isLoading,
    error,
  }
}
