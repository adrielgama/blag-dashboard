'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { articleFormSchema } from '@/schema/article.schema'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useArticleForm = (id: string, articleData: any) => {
  const router = useRouter()
  const { data: session } = useSession()

  const form = useForm({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: articleData?.title || '',
      description: articleData?.description || '',
      body: articleData?.body || '',
      published: articleData?.published || false,
      imageUrl: articleData?.imageUrl || '',
    },
  })

  const onSubmit = async (values: z.infer<typeof articleFormSchema>) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify(values),
        }
      )

      if (!response.ok) {
        throw new Error('Erro ao atualizar o artigo')
      }

      const updatedArticle = await response.json()
      toast.success('Artigo atualizado com sucesso!')
      router.push(`/articles/${updatedArticle.article.id}`)
    } catch (error) {
      toast.error('Falha ao atualizar o artigo!')
    }
  }

  return {
    form,
    onSubmit,
  }
}
