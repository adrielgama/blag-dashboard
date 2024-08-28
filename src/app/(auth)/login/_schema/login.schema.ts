import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z.string().email('Informe um email válido'),
  password: z.string().min(4, 'Senha deve ter pelo menos 4 caracteres'),
})

export type LoginFormData = z.infer<typeof loginFormSchema>
