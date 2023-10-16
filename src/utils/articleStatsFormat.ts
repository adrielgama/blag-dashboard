import { IArticle } from '@/types'

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
