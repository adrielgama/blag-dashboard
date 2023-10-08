import { Eye } from 'lucide-react'

import { formatDate } from '@/utils/formatDate'
import { formatViews } from '@/utils/formatViews'

type IArticles = {
  image: string
  title: string
  createdAt: string
  views: number
}

interface TopArticlesProps {
  articles: IArticles[]
}

export const TopArticles: React.FC<TopArticlesProps> = ({ articles }) => {
  return (
    <div className="bg-white rounded-md max-w-3xl p-8 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-primary mb-4">
        Top Postagens
      </h1>
      {articles.map(({ image, title, createdAt, views }, index) => (
        <div key={index} className="flex justify-between h-20">
          <div className="flex gap-2">
            <p className="font-semibold text-gray-400/80">
              {(index + 1).toString().padStart(2, '0')}
            </p>
            <div className="flex gap-6">
              <img
                src={image}
                alt={`Image to article ${index}`}
                className="w-20 h-16 rounded-md object-cover border"
              />
              <div className="flex flex-col gap-2 justify-between">
                <h3 className="font-medium max-w-xs">{title}</h3>
                <p className="text-gray-400/80 text-sm font-semibold">
                  {formatDate(createdAt)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-start w-28">
            <Eye size={24} className="fill-text text-secondary" />
            <p className="font-semibold">{formatViews(views)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
