'use client'
import { lazy, Suspense } from 'react'

import Sidebar from '@/components/sidebar'
import Spinner from '@/components/spinner'
import { useArticles } from '@/hooks/useArticles'

const TableArticles = lazy(() => import('./_components/table-articles'))

export default function ArticlesPage() {
  const { data, error } = useArticles()

  if (error) return <div>Error loading articles</div>

  return (
    <Sidebar>
      <Suspense fallback={<Spinner />}>
        {data ? <TableArticles articles={data} /> : <Spinner />}
      </Suspense>
    </Sidebar>
  )
}
