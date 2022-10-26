import { Dispatch, createElement, createContext, useContext, useReducer, ReactNode, useMemo } from 'react'
import { AnyAction, NewsState } from './types'
import { reducer } from './reducers'

const initialState: NewsState = {
  status: 'idle',
  error: null,
  entities: {},
  keys: [],
}

const context = createContext<[NewsState, Dispatch<AnyAction>] | null>(null)
context.displayName = `news context`

const providerFactory = (props: any, children: ReactNode) => createElement(context.Provider, props, children)

export const Provider = ({ children }: { children?: ReactNode }) => {
  try {
    const [state, dispatch] = useReducer(reducer, initialState)
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
