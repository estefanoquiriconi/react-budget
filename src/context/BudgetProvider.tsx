import { ReactNode, useMemo, useReducer } from 'react'
import { budgetReducer, initialState } from '../reducers/budgetReducer'
import { BudgetContext } from './BudgetContext.ts'

export type BudgetProviderProps = {
  children: ReactNode
}

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState)

  const totalExpenses = useMemo(
    () => state.expenses.reduce((total, expense) => expense.amount + total, 0),
    [state.expenses],
  )
  const remainingBudget = state.budget - totalExpenses

  return (
    <BudgetContext.Provider
      value={{
        state,
        dispatch,
        totalExpenses,
        remainingBudget,
      }}>
      {children}
    </BudgetContext.Provider>
  )
}
