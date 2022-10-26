import { ActionType, createAction, createAsyncAction } from 'typesafe-actions'
import { CollectionMeta, NewsArticle } from './types'

export const fetchArticleList = createAsyncAction(
  'FETCH_ARTICLE_LIST_REQUEST',
  'FETCH_ARTICLE_LIST_SUCCESS',
  'FETCH_ARTICLE_LIST_FAILURE'
)<undefined, { objects: NewsArticle[]; meta: CollectionMeta }, string>()
type FetchArticleList = ActionType<typeof fetchArticleList>

export const selectArticle = createAction('SELECT_ARTICLE')<string | null>()
type SelectArticle = ActionType<typeof selectArticle>

export type ActionTypes = FetchArticleList | SelectArticle
