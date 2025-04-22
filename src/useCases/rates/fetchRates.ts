import { createClient } from '@/services/supabase/client'
import { useQuery } from '@tanstack/react-query'

const supabase = createClient()

export function fetchRates() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['rate'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rate')
        .select('*')
        .order('created_at', { ascending: false })
      return { data, error }
    },
  })
  return {
    data: data?.data,
    isLoading,
    error,
  }
}

export function fetchRatesByLocate(locateId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['ratesByLocate', locateId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rate')
        .select('*')
        .eq('locate_id', locateId)
        .order('created_at', { ascending: false })
      return { data, error }
    },
  })
  return {
    data: data?.data,
    isLoading,
    error,
  }
}
