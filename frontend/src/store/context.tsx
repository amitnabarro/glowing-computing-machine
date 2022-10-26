import { createElement, createContext, useContext, ReactNode, useMemo } from 'react'
import { AnyAction, ThunkDispatch, NewsState } from './types'
import { reducer } from './reducers'
import createReducer from './createReducer'

const initialState: NewsState = {
  status: 'idle',
  error: null,
  entities: {},
  keys: [],
}

const context = createContext<[NewsState, ThunkDispatch<NewsState, AnyAction>] | null>(null)
context.displayName = `news context`

const providerFactory = (props: any, children: ReactNode) => createElement(context.Provider, props, children)

export const Provider = ({ children }: { children?: ReactNode }) => {
  try {
    const [state, dispatch] = createReducer(initialState, reducer)
    const value = useMemo(() => [state, dispatch], [state, dispatch])
    return providerFactory({ value }, children)
  } catch (error) {
    throw error
  }
}

export const useArticles = () => {
  const contextValue = useContext(context)
  if (contextValue == null) {
    throw new Error(`useArticles must be used inside a Provider.`)
  }
  return contextValue
}
