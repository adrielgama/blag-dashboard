import { z } from 'zod'

export const articleFormSchema = z.object({
  title: z.string().min(3, 'O título é obrigatório'),
  description: z.string().min(5, 'A descrição é obrigatória'),
  body: z.string().min(30, 'O corpo do artigo é obrigatório'),
  published: z.boolean(),
  imageUrl: z.string().url('URL da imagem inválida').optional(),
})

export type ArticleFormSchema = z.infer<typeof articleFormSchema>
