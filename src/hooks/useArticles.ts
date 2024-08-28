import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

import { fetchArticles } from '@/app/api/articles'
import { IArticle } from '@/types/article'

export const useArticles = () => {
  const { data: session } = useSession()

  const userId = session?.user?.id

  return useQuery<IArticle[]>({
    queryKey: ['articles', userId],
    queryFn: async () => await fetchArticles(userId!),
    enabled: !!userId,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 15, // 15 minutes
  })
}

export const useArticleDetail = (id: string | undefined) => {
  const { data: session } = useSession()
  const userId = session?.user?.id
  const queryClient = useQueryClient()

  const articles = queryClient.getQueryData<IArticle[]>(['articles'])
  let article = articles?.find((article) => article.id === id)

  const {
    data: fetchedArticles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['articles', userId],
    queryFn: async () => await fetchArticles(userId!),
    enabled: !!userId,
    refetchOnWindowFocus: false,
  })

  if (!article && fetchedArticles) {
    article = fetchedArticles.find((article) => article.id === id)
  }

  return {
    article,
    isLoading,
    error: !article
      ? new Error('Artigo não encontrado') &&
        toast.error('Artigo não encontrado')
      : error,
  }
}
