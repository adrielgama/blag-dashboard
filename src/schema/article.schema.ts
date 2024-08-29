import { z } from 'zod'

export const articleFormSchema = z.object({
  title: z.string().min(3, { message: 'O título é obrigatório' }),
  description: z.string().min(5, { message: 'A descrição é obrigatória' }),
  body: z.string().min(30, { message: 'O corpo do artigo é obrigatório' }),
  published: z.boolean(),
  imageUrl: z
    .string()
    .optional()
    .refine(
      (value) =>
        value === undefined ||
        value === '' ||
        z.string().url().safeParse(value).success,
      {
        message: 'URL da imagem inválida',
      }
    ),
})

export type ArticleFormSchema = z.infer<typeof articleFormSchema>
