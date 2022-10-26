import { Document, NewsArticle, NewsState } from './types'
import { ActionTypes } from './actions'

const arrayToMap = <T extends Document>(array: T[]) => {
  return array.reduce(
    (memo: { [key: string]: T }, item: T) => ({
      ...memo,
      [item._id]: item,
    }),
    {}
  )
}

export const reducer = (state: NewsState, action: ActionTypes): NewsState => {
  switch (action.type) {
    case 'FETCH_ARTICLE_LIST_REQUEST':
      return {
        ...state,
        status: 'busy',
      }
    case 'FETCH_ARTICLE_LIST_SUCCESS':
      const newEntities = arrayToMap<NewsArticle>(action.payload.objects)
      return {
        ...state,
        entities: {
          ...state.entities,
          ...newEntities,
        },
        keys: Array.from(new Set([...state.keys, ...action.payload.objects.map((r: NewsArticle) => r._id)])),
        status: 'idle',
      }
    case 'FETCH_ARTICLE_LIST_FAILURE':
      return {
        ...state,
        error: action.payload,
        status: 'idle',
      }
    default:
      return state
  }
}
