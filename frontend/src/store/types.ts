// flux
export interface Action<T = any> {
  type: T
}
export type Dispatch<A> = (value: A) => void
export type ThunkAction<S, A> = (dispatch: Dispatch<A>, state: S) => void
export type ThunkDispatch<S, A> = (action: A | ThunkAction<S, A>) => void

export interface AnyAction extends Action {
  [extraProps: string]: any
}

// app
type Source = {
  id: string | null
  name: string
}

export interface Document {
  _id: string
}

export interface CollectionMeta {
  total: number
  limit: number
  offset: number
}

export interface NewsArticle extends Document {
  source: Source | null
  author: string | null
  title: string
  description: string
  url: URL
  urlToImage: URL
  publishedAt: Date
  content: string
}

export interface NewsState {
  status: 'idle' | 'busy'
  error: string | null
  entities: Record<string, NewsArticle>
  keys: string[]
}
