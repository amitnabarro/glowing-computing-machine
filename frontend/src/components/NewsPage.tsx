import { useEffect, useState } from 'react'
import { useArticles } from '../store/context'
import { fetchArticles } from '../services'
import { NewsCard, NewsCardWide } from './NewsCard'
import Search from './Search'

const dateFromObjectID = (objectID: string) => Number(new Date(parseInt(objectID.substring(0, 8), 16) * 1000))

export default () => {
  const [state, dispatch] = useArticles()
  const [wideMode, setWideMode] = useState(false)

  useEffect(() => {
    dispatch(fetchArticles('drones'))
  }, [])
  return (
    <div className="p-6 bg-gray-200">
      {state.status === 'busy' && <div>Loading...</div>}
      {state.status === 'idle' && (
        <div className="flex flex-col space-y-6">
          <Search />
          <div className="isolate inline-flex">
            <button
              type="button"
              onClick={() => setWideMode(true)}
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setWideMode(false)}
              className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                />
              </svg>
            </button>
          </div>
          {wideMode ? (
            <div className="flex flex-col">
              {Object.values(state.entities).map(article => (
                <NewsCardWide key={article._id} {...article} />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 bg-gray-200">
              {Object.values(state.entities)
                .sort((a, b) => dateFromObjectID(b._id) - dateFromObjectID(a._id))
                .map(article => (
                  <NewsCard key={article._id} {...article} />
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
