import { IArticle } from '@/types'

const getTotalViews = (articles?: IArticle[]) => {
  if (!Array.isArray(articles)) {
    return 0
  }

  return articles.reduce((total: number, article: IArticle) => {
    return total + (article.published ? article.views || 0 : 0)
  }, 0)
}

const getPostedArticlesCount = (articles?: IArticle[]) => {
  if (!Array.isArray(articles)) {
    return 0
  }

  return articles.filter((article: IArticle) => article.published).length
}

const getDraftsCount = (articles?: IArticle[]) => {
  if (!Array.isArray(articles)) {
    return 0
  }

  return articles.filter((article: IArticle) => !article.published).length
}

export { getDraftsCount, getPostedArticlesCount, getTotalViews }
