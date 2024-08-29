import { z } from 'zod'

export const registerFormSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Informe um email válido'),
  password: z.string().min(4, 'Senha deve ter pelo menos 4 caracteres'),
})

export type RegisterFormData = z.infer<typeof registerFormSchema>
