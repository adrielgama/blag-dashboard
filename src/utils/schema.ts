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

const updateArticleSchema = z.object({
  title: z
    .string()
    .min(10, { message: 'Mínimo de 10 caracteres' })
    .max(80, { message: 'Máximo de 60 caracteres' }),
  description: z
    .string()
    .min(25, { message: 'Mínimo de 25 caracteres' })
    .max(150, { message: 'Máximo de 80 caracteres' })
    .optional(),
  body: z
    .string()
    .min(100, { message: 'Mínimo de 100 caracteres' })
    .max(30000, { message: 'Máximo de 30.000 caracteres' }),
  published: z.boolean(),
  imageUrl: z.string().optional(),
})

const updateProfileSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: 'Mínimo de 4 caracteres',
    })
    .max(30, { message: 'Máximo de 30 caracteres' })
    .optional(),
  email: z
    .string()
    .email({
      message: 'Precisa ser um email válido.',
    })
    .optional(),
  password: z
    .string()
    .min(6, {
      message: 'Use 6 caracteres ou mais.',
    })
    .optional(),
})

export { loginSchema, signupSchema, updateArticleSchema, updateProfileSchema }
