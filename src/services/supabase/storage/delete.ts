import { createClient } from '@/services/supabase/client'

const supabase = createClient()

export async function deleteImage(url: string) {
  try {
    const { error } = await supabase.functions.invoke('delete-image', {
      body: { url },
      method: 'DELETE',
    })

    if (error) {
      throw error
    }

    return true
  } catch (error) {
    console.error('Erro ao deletar arquivo:', error)
    return false
  }
}
