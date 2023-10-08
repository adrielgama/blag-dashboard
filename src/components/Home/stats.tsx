import { ReactNode } from 'react'

import { formatViews } from '@/utils/formatViews'

interface StatsProps {
  icon: ReactNode
  value: number
  title: string
}

export const Stats: React.FC<StatsProps> = ({ icon, title, value }) => {
  return (
    <div className="bg-white rounded-md px-10 py-4 flex gap-4">
      <span className="bg-secondary text-text shadow-gray-500/50 shadow-sm text-4xl w-fit h-fit p-2 rounded-md">
        {icon}
      </span>
      <div>
        <h1 className="text-3xl font-bold">{formatViews(value)}</h1>
        <p>{title}</p>
      </div>
    </div>
  )
}
