/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'

import { Eye, Pen, PenBox } from 'lucide-react'
import { useQuery } from 'react-query'

import { Stats } from '@/components/Home/stats'
import { TopArticles } from '@/components/Home/topArticles'
import { Welcome } from '@/components/Home/welcome'
import { useArticleContext } from '@/context/ArticleContext'
import { useAuthContext } from '@/context/AuthContext'
import { getMyArticles } from '@/services/'
import {
  getDraftsCount,
  getPostedArticlesCount,
  getTotalViews,
} from '@/utils/articleStatsFormat'

export const Home: React.FC = () => {
  const { user } = useAuthContext()
  const { setArticles } = useArticleContext()

  const { data, isLoading } = useQuery(
    ['my-articles'],
    async () => getMyArticles(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )

  const articles = data?.articles

  useEffect(() => {
    return setArticles(articles || [])
  }, [articles])

  const totalViews = getTotalViews(articles)
  const postedArticlesCount = getPostedArticlesCount(articles)
  const draftsCount = getDraftsCount(articles)

  return (
    <div className="flex flex-col gap-4 container">
      <div className="flex flex-row gap-4">
        <Welcome name={user?.name || user?.email} isLoading={isLoading} />
        {articles && (
          <div className="flex flex-col gap-4">
            <Stats
              icon={<Eye />}
              title="Total views"
              value={totalViews}
              isLoading={isLoading}
            />
            <Stats
              icon={<Pen />}
              title="Artigos postados"
              value={postedArticlesCount}
              isLoading={isLoading}
            />
            <Stats
              icon={<PenBox />}
              title="Rascunhos"
              value={draftsCount}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>

      {articles && <TopArticles articles={articles} />}
    </div>
  )
}
