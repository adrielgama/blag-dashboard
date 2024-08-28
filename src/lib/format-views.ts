import { IArticle } from '@/types/article'

export function formatViews(views: number) {
  if (views === 0) {
    return '0'
  } else if (views >= 1000 && views < 1000000) {
    return (views / 1000).toFixed(1) + 'k'
  } else if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + 'm'
  } else {
    return views.toString().padStart(2, '0')
  }
}

const getTotalViews = (articles?: IArticle[]) => {
  if (!Array.isArray(articles)) {
    return 0
  }

  return articles.reduce((total: number, article: IArticle) => {
    return article && article.published ? total + (article.views || 0) : total
  }, 0)
}

const getPostedArticlesCount = (articles?: IArticle[]) => {
  if (!Array.isArray(articles)) {
    return 0
  }

  return articles.filter((article: IArticle) => article && article.published)
    .length
}

const getDraftsCount = (articles?: IArticle[]) => {
  if (!Array.isArray(articles)) {
    return 0
  }

  return articles.filter((article: IArticle) => article && !article.published)
    .length
}

export { getDraftsCount, getPostedArticlesCount, getTotalViews }
