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

export const formSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  description: z.string().min(1, 'A descrição é obrigatória'),
  category: z
    .enum(['restaurante', 'hotel', 'banco', 'natureza', 'loja'], {
      required_error: 'Por favor, selecione uma categoria',
    })
    .optional(),
  address: z.string().min(1, 'O endereço é obrigatório'),
})

export type FormSchema = z.infer<typeof formSchema>

export const userSchema = z.object({
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

export type UserSchema = z.infer<typeof userSchema>
