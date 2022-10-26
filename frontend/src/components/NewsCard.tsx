import { NewsArticle } from '../store/types'

export default ({ publishedAt, author, source, title, urlToImage }: NewsArticle) => (
  <div className="flex flex-col h-80 border border-gray-400 rounded drop-shadow-sm space-y-0">
    <img src={urlToImage.toString()} className="h-48 w-full object-cover rounded-t mb-2" />
    <div className="inline-flex justify-between text-gray-500 text-sm px-2">
      <div>{publishedAt.toLocaleDateString()}</div>
      <div>{source?.name}</div>
    </div>
    <div className="inline-flex text-gray-500 text-sm px-2">
      <div>by: {author}</div>
    </div>
    <div>{title}</div>
  </div>
)
