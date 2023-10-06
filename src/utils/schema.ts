import z from 'zod'

const loginSchema = z.object({
  email: z.string().email({
    message: 'Precisa ser um email válido.',
  }),
  password: z.string().min(6, {
    message: 'Use 6 caracteres ou mais.',
  }),
})

const signupSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: 'Mínimo de 4 caracteres',
    })
    .max(30, { message: 'Máximo de 30 caracteres' }),
  email: z.string().email({
    message: 'Precisa ser um email válido.',
  }),
  password: z.string().min(6, {
    message: 'Use 6 caracteres ou mais.',
  }),
})

export { loginSchema, signupSchema }
