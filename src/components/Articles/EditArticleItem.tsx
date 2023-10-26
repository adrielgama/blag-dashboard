/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'

import toast, { Toaster } from 'react-hot-toast'
import { z } from 'zod'

import { useArticleContext } from '@/context/ArticleContext'
import { updateArticleSchema } from '@/utils/schema'

import { ArticleForm } from './ArticleForm'
import { Skeleton } from '../ui/skeleton'

export const EditArticleItem: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const { selectedArticle, updateArticle, getArticles } = useArticleContext()

  const onSubmit = async (values: z.infer<typeof updateArticleSchema>) => {
    setLoading(true)
    try {
      const articleId = selectedArticle?.id

      if (!articleId) {
        toast.error('Nenhum ID encontrado para fazer o envio.')
        return
      }

      await updateArticle(articleId, values)
      toast.success('Alterações feitas.')

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('ERROR: ', error)
      toast.error('Ocorreu algum erro ao tentar editar seu artigo.')
    } finally {
      setLoading(false)
      await getArticles()
    }
  }

  return (
    <div>
      {loading ? (
        <div className="flex items-start space-x-4">
          <div className="space-y-2">
            <Skeleton className="h-10 w-[60vw]" />
            <Skeleton className="h-10 w-[60vw]" />
            <Skeleton className="h-96 w-[60vw]" />
            <Skeleton className="h-12 w-[60vw]" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-12 w-[20vw]" />
            <Skeleton className="h-28 w-[20vw]" />
          </div>
        </div>
      ) : (
        <ArticleForm article={selectedArticle!} onSubmit={onSubmit} />
      )}
      <Toaster />
    </div>
  )
}
