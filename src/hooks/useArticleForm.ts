'use client'
import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { articleFormSchema } from '@/schema/article.schema'
import { IArticle, IArticleUpdate } from '@/types/article'

export const useArticleForm = (articleData: IArticle | null = null) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  const form = useForm<IArticleUpdate>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: articleData?.title || '',
      description: articleData?.description || '',
      body: articleData?.body || '',
      published: articleData?.published || false,
      imageUrl: articleData?.imageUrl || '',
    },
  })

  const onSubmit = async (values: IArticleUpdate) => {
    setIsLoading(true)

    try {
      const method = articleData?.id ? 'PATCH' : 'POST'
      const url = articleData?.id
        ? `${process.env.NEXT_PUBLIC_API_URL}/articles/${articleData.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/articles`

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error('Erro ao salvar o artigo')
      }

      const updatedArticle = await response.json()
      toast.success(
        `Artigo ${articleData?.id ? 'atualizado' : 'criado'} com sucesso!`
      )
      router.push(`/articles/${updatedArticle.article.id}`)
    } catch (error) {
      toast.error('Falha ao salvar o artigo!')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    form,
    onSubmit,
    isLoading,
  }
}
