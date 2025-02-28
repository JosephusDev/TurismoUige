'use client'
import { useFetchEvents } from '@/useCases/event'

export default function Events() {
  const { data: events, isLoading, error } = useFetchEvents()

  if (isLoading) return <p>Carregando...</p>

  if (error) return <p>Erro ao carregar os lugares.</p>

  console.log(events)

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <ul>
        {events?.data?.map(event => (
          <li key={event.id}>
            {event.title} - {event.description}
            {event.date} - {event.address}
            {event.created_at}
          </li>
        ))}
      </ul>
    </div>
  )
}
