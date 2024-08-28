import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

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
  })
}
