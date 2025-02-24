'use client'
import { supabase } from '@/services/supabase/client'
import { useFetchLocates } from '@/useCases/locate/useFetchLocates'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const { data: locates, isLoading, error } = useFetchLocates()
  if (isLoading) {
    return <p>Carregando...</p>
  }
  if (error) {
    return <p>Erro: {error.message}</p>
  }
  return (
    <div>
      <ul>
        {locates?.data?.map(locate => (
          <li key={locate.id}>{locate.name}</li>
        ))}
      </ul>
      <Link href='/create'>Criar</Link>
    </div>
  )
}
