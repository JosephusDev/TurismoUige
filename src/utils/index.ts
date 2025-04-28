import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatDate(date: Date): string {
  // Ajusta a data para o fuso horário local
  const adjustedDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60000,
  )
  return format(adjustedDate, "dd 'de' MMM 'de' yyyy", { locale: ptBR })
}
