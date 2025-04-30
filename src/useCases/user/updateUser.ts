import { createClient } from '@/services/supabase/client'
import { AuthSchema, UserSchema } from '@/services/supabase/types/schema'
import { useMutation } from '@tanstack/react-query'

const supabase = createClient()

export function useUpdateUser() {
  const {
    mutateAsync: updateUser,
    isPending,
    error,
    data,
  } = useMutation({
    mutationKey: ['updateUser'],
    mutationFn: async ({
      userId,
      authData,
      userData,
    }: {
      userId: string
      authData: AuthSchema
      userData: Omit<UserSchema, 'password'>
    }) => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        const token = session?.access_token

        const response = await fetch(
          'https://rbkzdxccqxasqaqrlhum.supabase.co/functions/v1/update-user',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              userId,
              userData,
              authData,
            }),
          },
        )

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.message || 'Erro ao atualizar o usuário')
        }

        if (error) {
          throw error
        }

        return true
      } catch (error) {
        throw error
      }
    },
  })

  return {
    updateUser,
    isPending,
    error,
    data,
  }
}
