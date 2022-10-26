import { NewsArticle } from '../store/types'

export const NewsCard = ({ publishedAt, author, source, title, urlToImage }: NewsArticle) => (
  <div className="flex flex-col h-80 border border-gray-400 rounded drop-shadow-sm space-y-0">
    <img src={urlToImage.toString()} className="h-48 w-full object-cover rounded-t mb-2" />
    <div className="inline-flex justify-between text-gray-500 text-sm px-2">
      <div>{publishedAt.toLocaleDateString()}</div>
      <div>{source?.name}</div>
    </div>
    <div className="inline-flex text-gray-500 text-sm px-2">
      <a href={`https://en.wikipedia.org/w/index.php?go=Go&search=${author}`} target="_blank">
        by: {author}
      </a>
    </div>
    <div>{title}</div>
  </div>
)

export const NewsCardWide = ({ publishedAt, author, source, title, urlToImage }: NewsArticle) => (
  <div className="flex items-center h-48 border-gray-500 border rounded shadow">
    <div className="h-full">
      <img src={urlToImage.toString()} className="h-full object-cover rounded-t mb-2" />
    </div>
    <div className="flex flex-col grow">
      <div className="inline-flex justify-between text-gray-500 text-sm px-2">
        <div>{publishedAt.toLocaleDateString()}</div>
        <div>{source?.name}</div>
      </div>
      <div className="inline-flex text-gray-500 text-sm px-2">
        <div>by: {author}</div>
      </div>
    </div>
  </div>
)
