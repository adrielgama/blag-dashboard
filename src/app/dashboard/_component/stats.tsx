import { ReactNode } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { formatViews } from '@/lib/format-views'

interface StatsProps {
  icon: ReactNode
  value: number
  title: string
  isLoading?: boolean
}

export default function Stats({ icon, title, value, isLoading }: StatsProps) {
  return (
    <div className="flex gap-4 rounded-md bg-white px-4 py-4 dark:bg-zinc-800 xl:px-16">
      <span className="text-text h-fit w-fit rounded-md bg-zinc-100 p-2 text-4xl dark:bg-zinc-900">
        {icon}
      </span>
      <div className="min-w-max">
        {isLoading ? (
          <Skeleton className="h-8 w-8" />
        ) : (
          <h1 className="text-3xl font-bold">{formatViews(value)}</h1>
        )}
        <p>{title}</p>
      </div>
    </div>
  )
}
