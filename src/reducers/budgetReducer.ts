import { DraftExpense, Expense } from '../types'

export enum BudgetActionTypes {
  ADD_BUDGET = 'ADD_BUDGET',
  TOGGLE_MODAL = 'TOGGLE_MODAL',
  ADD_EXPENSE = 'ADD_EXPENSE',
}

export type BudgetActions =
  | { type: BudgetActionTypes.ADD_BUDGET; payload: { budget: number } }
  | { type: BudgetActionTypes.TOGGLE_MODAL }
  | { type: BudgetActionTypes.ADD_EXPENSE; payload: { expense: DraftExpense } }

export type BudgetState = {
  budget: number
  modal: boolean
  expenses: Expense[]
}

export const initialState: BudgetState = {
  budget: 0,
  modal: false,
  expenses: [],
}

const addExpense = (
  expenses: Expense[],
  newExpense: DraftExpense
): Expense[] => {
  const expense: Expense = {
    id: crypto.randomUUID(),
    ...newExpense,
  }

  return [...expenses, expense]
}

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  switch (action.type) {
    case BudgetActionTypes.ADD_BUDGET:
      return {
        ...state,
        budget: action.payload.budget,
      }

    case BudgetActionTypes.TOGGLE_MODAL:
      return {
        ...state,
        modal: !state.modal,
      }

    case BudgetActionTypes.ADD_EXPENSE:
      return {
        ...state,
        expenses: addExpense(state.expenses, action.payload.expense),
      }

    default:
      return state
  }
}
