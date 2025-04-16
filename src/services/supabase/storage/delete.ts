import { createClient } from '@/services/supabase/client'

const supabase = createClient()

export async function deleteImage(url: string) {
  try {
    // Extrair o nome do arquivo da URL
    const fileName = url.split('/').pop()
    if (!fileName) {
      throw new Error('Nome do arquivo não encontrado na URL')
    }

    // Deletar o arquivo do bucket
    const { error } = await supabase.storage
      .from('locates')
      .remove([`${fileName}`])

    if (error) {
      throw error
    }

    return true
  } catch (error) {
    console.error('Erro ao deletar arquivo do Supabase:', error)
    return false
  }
}
