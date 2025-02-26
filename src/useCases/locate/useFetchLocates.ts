import { createClient } from '@/services/supabase/client'
import { FilterEnum } from '@/services/supabase/types'
import { useQuery } from '@tanstack/react-query'

export function useFetchLocates() {
  const supabase = createClient()
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

export function useFetchFilteredLocates(filter: FilterEnum, value: string) {
  const supabase = createClient()
  const { data, isLoading, error } = useQuery({
    queryKey: ['filteredLocates'],
    queryFn: async () => {
      if (filter === 'category' || filter === 'address') {
        const { data, error } = await supabase
          .from('location')
          .select('*')
          .like(filter, `%${value}%`)
          .order('name')
        return { data, error }
      } else {
        const { data, error } = await supabase
          .rpc('get_locates_by_rates', { rate_arg: Number(value) })
          .order('name')
        return { data, error }
      }
    },
  })
  return {
    data,
    isLoading,
    error,
  }
}

export function useFetchLocatesByGreatestAvgRate() {
  const supabase = createClient()
  const { data, isLoading, error } = useQuery({
    queryKey: ['locateByGreatestAvgRate'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_locates_by_greatest_rate')
      return { data, error }
    },
  })
  return {
    data,
    isLoading,
    error,
  }
}
