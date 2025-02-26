'use client'
import { useFetchLocatesByGreatestAvgRate } from '@/useCases/locate/useFetchLocates'

export default function Locates() {
  const { data: locates, isLoading, error } = useFetchLocatesByGreatestAvgRate()

  if (isLoading) return <p>Carregando...</p>

  if (error) return <p>Erro ao carregar os lugares.</p>

  console.log(locates)

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <ul>
        {locates?.data?.map(locate => (
          <li key={locate.id}>
            {locate.name} - {locate.average_rating}
          </li>
        ))}
      </ul>
    </div>
  )
}
