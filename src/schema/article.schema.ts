import { z } from 'zod'

export const articleFormSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  description: z.string().min(1, 'A descrição é obrigatória'),
  body: z.string().min(1, 'O corpo do artigo é obrigatório'),
  published: z.boolean(),
  imageUrl: z.string().url('URL da imagem inválida').optional(),
})

export type ArticleFormSchema = z.infer<typeof articleFormSchema>
