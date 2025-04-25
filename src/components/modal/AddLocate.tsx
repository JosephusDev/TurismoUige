import { Input } from '../ui/input'
import { DialogHeader, DialogTitle } from '../ui/dialog'
import { DialogTrigger } from '../ui/dialog'
import { DialogContent } from '../ui/dialog'
import { Dialog } from '../ui/dialog'
import { Button } from '../ui/button'
import { LabelError } from '../ui/label-error'
import { Label } from '../ui/label'
import { Loader2, Plus } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { formSchema, FormSchema } from '@/services/supabase/types/schema'
import { useCreateLocate } from '@/useCases/locate'
import { useAddImage } from '@/useCases/images/addImage'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { ImageUpload } from '../UploadFiles'
import { useState } from 'react'
import { Textarea } from '../ui/textarea'

const categories = [
  { value: 'restaurante', label: 'Restaurante' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'banco', label: 'Banco' },
  { value: 'natureza', label: 'Natureza' },
  { value: 'loja', label: 'Loja' },
]

export default function AddLocate() {
  const { createLocate, isPending } = useCreateLocate()
  const { createImage: addImage } = useAddImage()
  const queryClient = useQueryClient()
  const [locateId, setLocateId] = useState<string | null>(null)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      address: '',
      category: undefined,
    },
  })

  async function onSubmit(data: FormSchema) {
    try {
      const locate = await createLocate(data)
      setLocateId(locate.id)
      toast.success('Local adicionado com sucesso')
      queryClient.invalidateQueries({ queryKey: ['locates'] })
    } catch (error) {
      console.error('Erro ao adicionar local:', error)
    }
  }

  async function handleUploadSuccess(urls: string[]) {
    if (!locateId) return

    try {
      for (const url of urls) {
        await addImage({
          url,
          locate_id: locateId,
        })
      }
      form.reset()
      toast.success('Imagens adicionadas com sucesso')
      queryClient.invalidateQueries({ queryKey: ['images', locateId] })
      setLocateId(null)
    } catch (error) {
      console.error('Erro ao adicionar imagens:', error)
      toast.error('Erro ao adicionar imagens')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className='h-4 w-4' />
          <span className='hidden sm:block'>Adicionar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-xl'>
        <DialogHeader>
          <DialogTitle>Adicionar Local</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <Label>Nome</Label>
            <Input placeholder='Nome do local' {...form.register('name')} />
            <LabelError message={form.formState.errors.name?.message} />
          </div>
          <div>
            <Label>Descrição</Label>
            <Textarea
              placeholder='Descrição do local'
              rows={5}
              className='resize-none'
              {...form.register('description')}
            />
            <LabelError message={form.formState.errors.description?.message} />
          </div>
          <div>
            <Label>Categoria</Label>
            <Select
              onValueChange={value => form.setValue('category', value as any)}
              value={form.watch('category')}
            >
              <SelectTrigger>
                <SelectValue placeholder='Selecione uma categoria' />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <LabelError message={form.formState.errors.category?.message} />
          </div>
          <div>
            <Label>Endereço</Label>
            <Input
              placeholder='Endereço do local'
              {...form.register('address')}
            />
            <LabelError message={form.formState.errors.address?.message} />
          </div>
          {locateId && <ImageUpload onUploadSuccess={handleUploadSuccess} />}
          <div className='flex justify-end gap-2'>
            <Button type='submit' disabled={isPending || !!locateId}>
              {isPending ? (
                <Loader2 className='h-4 w-4 animate-spin' />
              ) : (
                'Adicionar'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
