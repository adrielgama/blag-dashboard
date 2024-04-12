import { ReactNode } from 'react'

import { formatViews } from '@/utils/formatViews'

import { Skeleton } from '../ui/skeleton'

interface StatsProps {
  icon: ReactNode
  value: number
  title: string
  isLoading?: boolean
}

export const Stats: React.FC<StatsProps> = ({
  icon,
  title,
  value,
  isLoading,
}) => {
  return (
    <div className="bg-white rounded-md px-20 py-4 flex gap-4">
      <span className="bg-blue-400 text-text shadow-gray-500/50 shadow-sm text-4xl w-fit h-fit p-2 rounded-md">
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
