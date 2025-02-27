import { ActionDispatch, createContext } from 'react'
import { BudgetActions, BudgetState } from '../reducers/budgetReducer'

interface BudgetContextProps {
  state: BudgetState
  dispatch: ActionDispatch<[action: BudgetActions]>
}

export const BudgetContext = createContext<BudgetContextProps>(
  {} as BudgetContextProps
)
