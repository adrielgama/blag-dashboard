'use client'
import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { createArticle, updateArticle } from '@/app/api/articles'
import { articleFormSchema } from '@/schema/article.schema'
import { IArticle, IArticleUpdate } from '@/types/article'

export const useArticleForm = (articleData: IArticle | null = null) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()
  const queryClient = useQueryClient()

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
    const accessToken = session?.accessToken

    if (!accessToken) {
      toast.error('Sessão expirada. Por favor, faça login novamente.')
      router.push('/login')
      return
    }

    setIsLoading(true)

    try {
      let savedArticle: IArticle

      if (articleData?.id) {
        savedArticle = await updateArticle(articleData.id, values, accessToken)
      } else {
        savedArticle = await createArticle(values, accessToken)
      }

      await queryClient.invalidateQueries({
        queryKey: ['articles'],
        refetchType: 'all',
      })

      toast.success(
        `Artigo ${articleData?.id ? 'atualizado' : 'criado'} com sucesso!`
      )
      router.push(`/articles/${savedArticle.id}`)
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
