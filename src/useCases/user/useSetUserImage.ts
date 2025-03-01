import { createClient } from '@/services/supabase/client'

export const uploadToSupabase = async (file: File) => {
  const supabase = createClient()
  const filePath = `${Date.now()}-${file.name}`

  const { data, error } = await supabase.storage
    .from('user_image')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false, // Evita sobrescrever arquivos existentes
    })

  if (error) {
    console.error(error.message)
    throw new Error(`Erro ao fazer upload para Supabase: ${error.message}`)
  }

  const { data: urlData } = supabase.storage
    .from('user_image')
    .getPublicUrl(filePath)
  return urlData.publicUrl
}
