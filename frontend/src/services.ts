import { fetchArticleList } from './store/actions'
import { Dispatch, AnyAction, NewsArticle } from './store/types'

export const fetchArticles = (q: string, limit: number = 100, offset: number = 0) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(fetchArticleList.request())
    try {
      const response = await fetch(`http://localhost:8000/api/articles?q=${q}&limit=${limit}&offset=${offset}`)
      const { meta, objects } = await response.json()
      // hydrate
      const articles = objects.map((article: any) => ({
        ...article,
        publishedAt: new Date(article.publishedAt),
        url: new URL(article.url),
        urlToImage: new URL(article.urlToImage),
      }))
      dispatch(fetchArticleList.success({ objects: articles, meta }))
    } catch (error) {
      dispatch(fetchArticleList.failure('error'))
    }
  }
}
