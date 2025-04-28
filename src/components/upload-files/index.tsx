'use client'

import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/components/ui/dropzone'
import { useEffect, useState } from 'react'
import { useSupabaseUpload } from '@/services/supabase/storage/upload'
import { createClient } from '@/services/supabase/client'

const supabase = createClient()

interface FileUploadProps {
  onUploadSuccess?: (urls: string[]) => void
}

export function ImageUpload({ onUploadSuccess }: FileUploadProps) {
  const [processedUpload, setProcessedUpload] = useState(false)
  const props = useSupabaseUpload({
    bucketName: 'locates',
    allowedMimeTypes: ['image/*'],
    maxFiles: 2,
    maxFileSize: 1000 * 1000 * 5,
  })

  useEffect(() => {
    if (
      props.isSuccess &&
      props.files.length > 0 &&
      props.successes.length > 0 &&
      !processedUpload
    ) {
      const urls = props.successes.map(fileName => {
        const { data } = supabase.storage
          .from('locates')
          .getPublicUrl(`${fileName}`)
        return data.publicUrl
      })

      onUploadSuccess?.(urls)
      setProcessedUpload(true)
    }

    // Reset processedUpload when files change
    if (props.files.length === 0) {
      setProcessedUpload(false)
    }
  }, [
    props.isSuccess,
    props.files,
    props.successes,
    onUploadSuccess,
    processedUpload,
  ])

  return (
    <div className='w-full'>
      <Dropzone {...props}>
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>
    </div>
  )
}
