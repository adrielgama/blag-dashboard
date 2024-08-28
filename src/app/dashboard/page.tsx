'use client'
import { lazy, Suspense } from 'react'

import { Eye, Pen, PenBox } from 'lucide-react'

import Sidebar from '@/components/sidebar'
import Spinner from '@/components/spinner'
import { useArticles } from '@/hooks/useArticles'
import {
  getDraftsCount,
  getPostedArticlesCount,
  getTotalViews,
} from '@/lib/format-views'

const Welcome = lazy(() => import('./_component/welcome'))
const Stats = lazy(() => import('./_component/stats'))
const TableTopArticles = lazy(() => import('./_component/table-top-articles'))

export default function DashboardPage() {
  const { data, error, isLoading } = useArticles()

  if (isLoading) return <Spinner />
  if (error) return <div>Error loading articles</div>

  const totalViews = getTotalViews(data)
  const postedArticlesCount = getPostedArticlesCount(data)
  const draftsCount = getDraftsCount(data)

  return (
    <Sidebar>
      <div className="flex flex-col gap-4 md:flex-row">
        <Suspense fallback={<Spinner />}>
          <Welcome />
        </Suspense>
        <Suspense fallback={<Spinner />}>
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
        </Suspense>
      </div>
      <Suspense fallback={<Spinner />}>
        <TableTopArticles articles={data} />
      </Suspense>
    </Sidebar>
  )
}
