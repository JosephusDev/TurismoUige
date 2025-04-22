import { createClient } from '@/services/supabase/client'
import { FilterEnum } from '@/services/supabase/types'
import { useQuery } from '@tanstack/react-query'

const supabase = createClient()

export function fetchLocates() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['locates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('locate')
        .select('*')
        .order('name')
      return { data, error }
    },
  })
  return {
    data: data?.data,
    isLoading,
    error,
  }
}

export function fetchFilteredLocates(filter: FilterEnum, value: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['filteredLocates'],
    queryFn: async () => {
      if (filter === 'category' || filter === 'address') {
        const { data, error } = await supabase
          .from('locate')
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
    data: data?.data,
    isLoading,
    error,
  }
}

export function fetchLocatesByGreatestAvgRate() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['locateByGreatestAvgRate'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_locates_by_greatest_rate')
      return { data, error }
    },
  })
  return {
    data: data?.data,
    isLoading,
    error,
  }
}
