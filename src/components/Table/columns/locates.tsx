'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '../../ui/button'
import { toast } from 'sonner'
import { LocateType } from '@/services/supabase/types'
import { Trash, Eye, Image as ImageIcon, Loader2 } from 'lucide-react'
import { CategoryBadge } from '@/components/ui/category-badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { deleteImage } from '@/services/supabase/storage/delete'
import NextImage from 'next/image'
import { useDeleteLocate } from '@/useCases/locate'
import { fetchImages } from '@/useCases/images/fetchImages'
import { useQueryClient } from '@tanstack/react-query'

export const columns: ColumnDef<LocateType>[] = [
  {
    id: 'index',
    header: '#',
    cell: ({ row }) => {
      return row.index + 1
    },
  },
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
    cell: ({ row }) => {
      return <CategoryBadge category={row.original.category!} />
    },
  },
  {
    accessorKey: 'address',
    header: 'Endereço',
  },
  {
    id: 'actions',
    enableHiding: false,
    header: 'Ações',
    cell: ({ row }) => {
      const locate = row.original
      const queryClient = useQueryClient()
      const [images, setImages] = useState<string[]>([])
      const [isLoading, setIsLoading] = useState(false)
      const { deleteLocate, isPending, error } = useDeleteLocate()
      const {
        data,
        error: errorImages,
        isSuccess: isSuccessImages,
        isLoading: isLoadingImages,
      } = fetchImages(locate.id)

      const handleDelete = async () => {
        try {
          await deleteLocate(locate.id)
          toast.success('Local eliminado com sucesso')
          queryClient.invalidateQueries({ queryKey: ['locates'] })
        } catch (error) {
          toast.error('Erro ao eliminar local')
        }
      }

      const handleDeleteImage = async (imageUrl: string) => {
        try {
          await deleteImage(imageUrl)
          setImages(images.filter(img => img !== imageUrl))
          toast.success('Imagem eliminada com sucesso')
        } catch (error) {
          toast.error('Erro ao eliminar imagem')
        }
      }

      const loadImages = async () => {
        if (errorImages) toast.error('Erro ao carregar imagens')
        if (isSuccessImages) {
          setImages(data?.map(image => image.url)!)
          setIsLoading(isLoadingImages)
        }
      }

      return (
        <div className='flex gap-2'>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='ghost' size='icon'>
                <Eye className='h-4 w-4' />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className='gap-4'>
                <DialogTitle>Descrição do Local</DialogTitle>
                <DialogDescription className='text-sm text-justify'>
                  {locate.description}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant='ghost' size='icon' onClick={loadImages}>
                <ImageIcon className='h-4 w-4' />
              </Button>
            </DialogTrigger>
            <DialogContent className='max-w-xl'>
              <DialogHeader className='gap-4'>
                <DialogTitle>Imagens do Local</DialogTitle>
              </DialogHeader>
              {isLoading ? (
                <div className='flex justify-center items-center'>
                  <Loader2 size={25} className='animate-spin text-primary' />
                </div>
              ) : images.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {images.map((imageUrl, index) => (
                    <div key={index} className='relative aspect-video'>
                      <NextImage
                        src={imageUrl}
                        alt={`Imagem ${index + 1}`}
                        fill
                        className='rounded-lg object-cover'
                      />
                      <Button
                        size='icon'
                        className='rounded-full absolute top-2 right-2 bg-primary/80 hover:bg-primary'
                        onClick={() => handleDeleteImage(imageUrl)}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className='text-center text-sm text-muted-foreground'>
                  Nenhuma imagem encontrada
                </p>
              )}
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant='ghost' size='icon'>
                <Trash className='h-4 w-4' />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className='gap-4'>
                <DialogTitle>Confirmar</DialogTitle>
                <DialogDescription>
                  Tem certeza que deseja eliminar este local? Esta ação não pode
                  ser desfeita.
                </DialogDescription>
              </DialogHeader>
              <div className='flex justify-end gap-2'>
                <Button
                  variant='destructive'
                  onClick={handleDelete}
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className='h-4 w-4 animate-spin' />
                  ) : (
                    'Confirmar'
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )
    },
  },
]
