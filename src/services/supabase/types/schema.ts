import { z } from 'zod'

export const authSchema = z.object({
  email: z
    .string({
      message: 'E-mail é obrigatório',
    })
    .email('E-mail inválido'),
  password: z
    .string({
      message: 'Senha é obrigatória',
    })
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

export type AuthSchema = z.infer<typeof authSchema>
