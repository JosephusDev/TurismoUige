import { Locate } from './locate'

export type Rate = {
  comment: string | null
  created_at: string
  id: string
  locate_id: string
  value: number
}

export type RateWithLocate = Rate & {
  locate: Pick<Locate, 'id' | 'name'>
}
