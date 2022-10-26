import { Reducer, useReducer } from 'react'
import { AnyAction, ThunkAction, ThunkDispatch } from './types'

export default <S>(initialState: S, reducer: Reducer<S, AnyAction>): [S, ThunkDispatch<S, AnyAction>] => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const thunkDispatch: ThunkDispatch<S, AnyAction> = (action: any) => {
    if (typeof action === 'function') {
      return (action as ThunkAction<S, AnyAction>)(dispatch, state)
    }
    dispatch(action as AnyAction)
  }

  return [state, thunkDispatch]
}
