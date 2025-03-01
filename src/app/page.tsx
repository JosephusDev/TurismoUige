'use client'
import { createClient } from '@/services/supabase/client'
import { useSignOut, useSignUp, useSignIn } from '@/useCases/auth'
import { UserType } from '@/services/supabase/types'
import { ChangeEvent, use, useState } from 'react'
import { useUpdateUser } from '@/useCases/user/useUpdateUser'

export default function Page() {
  const [imageUrl, setImageUrl] = useState<string>()
  const supabase = createClient()
  const { signUp, error: errorSignUp } = useSignUp()
  const { signIn, data, error: errorSignIn } = useSignIn()

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      const newImageUrls = filesArray.map(file => URL.createObjectURL(file))

      setImageUrl(newImageUrls[0])
    }
  }

  const handleSignIn = () =>
    signIn({
      email: 'condepinto2@gmail.com',
      password: 'adminadmin',
    })

  const handleSignUp = () => {
    const data = signUp({
      email: 'condepinto2@gmail.com',
      password: 'adminadmin',
    })
    console.log(data)
  }

  const handleSignOut = () => {
    useSignOut()
  }

  //Atualizar o usuário
  const updateUser = async () => {
    const userData: Pick<UserType, 'user_name' | 'avatar_url'> = {
      user_name: 'Conde Pinto',
      avatar_url:
        'https://rbkzdxccqxasqaqrlhum.supabase.co/storage/v1/object/public/user-image/1740640517627.png',
    }
    /*     const imageFile = await convertBlobUrlToFile(imageUrl!)

    const { imageUrl: UrlImage, error } = await uploadImage({
      file: imageFile,
      bucket: 'user-image',
    })

    if (error) {
      console.error(error)
      return
    } */

    const { data, error: userError } = await supabase.auth.getUser()

    /*     userData.avatar_url = UrlImage

    console.log(data?.user?.id, userData) */

    const { isLoading, error } = useUpdateUser(userData, data?.user?.id!)

    if (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <button onClick={handleSignIn}>Log in</button>
      <button onClick={handleSignUp}>Sign up</button>
      {data?.user && <button onClick={handleSignOut}>SignOut</button>}
      <div>{data?.user.role}</div>
      <div>
        <div>
          <label htmlFor='name'>Nome</label>
          <input type='text' placeholder='Nome' />
        </div>
        <div>
          <label htmlFor='image'>Image</label>
          <input type='file' onChange={handleImageChange} />
        </div>
        <div>
          <button onClick={updateUser}>Atualizar</button>
        </div>
      </div>
    </div>
  )
}
