import { DialogHeader, DialogTitle } from '../ui/dialog'
import { DialogTrigger } from '../ui/dialog'
import { DialogContent } from '../ui/dialog'
import { Dialog } from '../ui/dialog'
import { Button } from '../ui/button'
import { LabelError } from '../ui/label-error'
import { Label } from '../ui/label'
import { Loader2, Star } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { rateSchema, RateSchema } from '@/services/supabase/types/schema'
import { toast } from 'sonner'
import { Textarea } from '../ui/textarea'
import { useCreateRate } from '@/useCases/rates/createRate'
import { useQueryClient } from '@tanstack/react-query'

export default function AddEvaluate({
  locate,
  locateId,
}: {
  locate: string
  locateId: string
}) {
  const queryClient = useQueryClient()
  const { createRate, isPending } = useCreateRate()

  const form = useForm<RateSchema>({
    resolver: zodResolver(rateSchema),
    defaultValues: {
      value: 0,
      comment: '',
      locate_id: locateId,
    },
  })

  async function onSubmit(data: RateSchema) {
    try {
      await createRate(data)
      await queryClient.invalidateQueries({ queryKey: ['rate'] })
      await queryClient.invalidateQueries({
        queryKey: ['locateByGreatestAvgRate'],
      })
      toast.success('Avaliação enviada com sucesso!')
      form.reset()
    } catch (error) {
      toast.error('Erro ao enviar avaliação')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='rounded-full p-0 w-8 h-8'>
          <Star className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-xl'>
        <DialogHeader>
          <DialogTitle>{locate}</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='flex flex-row gap-8 justify-center mt-4'>
            {Array.from({ length: 5 }).map((_, index) =>
              index < form.watch('value') ? (
                <Star
                  onClick={() => form.setValue('value', index + 1)}
                  key={index}
                  size={32}
                  className='fill-yellow-400 text-yellow-400 cursor-pointer'
                />
              ) : (
                <Star
                  onClick={() => form.setValue('value', index + 1)}
                  key={index}
                  size={32}
                  className='text-gray-400 cursor-pointer'
                />
              ),
            )}
          </div>
          <LabelError message={form.formState.errors.value?.message} />
          <div>
            <Label>Comentário</Label>
            <Textarea
              placeholder='Deixe um comentário sobre o local'
              rows={5}
              className='resize-none'
              {...form.register('comment')}
            />
            <LabelError message={form.formState.errors.comment?.message} />
          </div>
          <div className='flex justify-end gap-2'>
            <Button type='submit' disabled={isPending}>
              {isPending ? (
                <Loader2 className='h-4 w-4 animate-spin' />
              ) : (
                'Avaliar'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
