import { ReactNode, useReducer } from 'react'
import { budgetReducer, initialState } from '../reducers/budgetReducer'
import { BudgetContext } from './BudgetContext.ts'

export type BudgetProviderProps = {
  children: ReactNode
}

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState)

  return (
    <BudgetContext.Provider
      value={{
        state,
        dispatch,
      }}>
      {children}
    </BudgetContext.Provider>
  )
}
