import { Database } from './db'

export type FilterEnum = 'category' | 'rate' | 'address'
export type LocateType = Database['public']['Tables']['locate']['Row']
export type UserType = Database['public']['Tables']['users']['Row']
export type EventType = Database['public']['Tables']['event']['Row']
export type RateType = Database['public']['Tables']['rate']['Row']
export type EnumLocateCategory = Database['public']['Enums']['category']
