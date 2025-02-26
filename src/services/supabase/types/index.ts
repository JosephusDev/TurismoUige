import { Database } from './db'

export type FilterEnum = 'category' | 'rate' | 'address'
export type LocateType = Database['public']['Tables']['location']['Row']
