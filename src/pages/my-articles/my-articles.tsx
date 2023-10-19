import { ListArticles } from '@/components/Articles/ListArticles'
import { useArticleContext } from '@/context/ArticleContext'

export const MyArticles: React.FC = () => {
  const { articles } = useArticleContext()

  // const { data } = useQuery(['my-articles'], async () => getMyArticles(), {
  //   keepPreviousData: true,
  //   refetchOnWindowFocus: false,
  // })

  return (
    <div className="flex flex-col gap-4 container">
      <ListArticles articles={articles || []} fromDraft={false} />
    </div>
  )
}
