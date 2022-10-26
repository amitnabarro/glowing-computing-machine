import { useState } from 'react'
import { useArticles } from '../store/context'
import { fetchArticles } from '../services'

export default () => {
  const [, dispatch] = useArticles()
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <form
      className="h-36 w-full flex items-center justify-center"
      onSubmit={e => {
        e.preventDefault()
        dispatch(fetchArticles(searchTerm))
      }}
    >
      <input
        id="search"
        name="search"
        className="w-96 rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
        placeholder="Search"
        type="search"
        onChange={e => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <button type="submit" className="hidden"></button>
    </form>
  )
}
