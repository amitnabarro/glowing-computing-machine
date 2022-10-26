import { useEffect } from 'react'
import { useArticles } from '../store/context'
import { fetchArticleList } from '../store/actions'
import NewsCard from './NewsCard'

export default () => {
  const [state, dispatch] = useArticles()

  const fetchArticles = async (limit: number = 20, offset: number = 0) => {
    dispatch(fetchArticleList.request())
    try {
      const response = await fetch(`http://localhost:8000/api/articles?limit=${limit}&offset=${offset}`)
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

  useEffect(() => {
    fetchArticles()
  }, [])
  return (
    <div className="p-6 bg-gray-200">
      {state.status === 'busy' && <div>Loading...</div>}
      {state.status === 'idle' && state.keys.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 bg-gray-200">
          {state.keys.map(key => (
            <NewsCard key={key} {...state.entities[key]} />
          ))}
        </div>
      )}
    </div>
  )
}
