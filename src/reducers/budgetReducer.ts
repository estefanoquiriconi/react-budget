import { DraftExpense, Expense } from '../types'

export type BudgetActions =
  | { type: 'ADD_BUDGET'; payload: { budget: number } }
  | { type: 'TOGGLE_MODAL' }
  | { type: 'ADD_EXPENSE'; payload: { expense: DraftExpense } }
  | { type: 'REMOVE_EXPENSE'; payload: { id: Expense['id'] } }

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

const removeExpense = (expenses: Expense[], id: Expense['id']): Expense[] => {
  return expenses.filter(expense => expense.id !== id)
}

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  switch (action.type) {
    case 'ADD_BUDGET':
      return {
        ...state,
        budget: action.payload.budget,
      }

    case 'TOGGLE_MODAL':
      return {
        ...state,
        modal: !state.modal,
      }

    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: addExpense(state.expenses, action.payload.expense),
        modal: false
      }

    case 'REMOVE_EXPENSE':
      return {
        ...state,
        expenses: removeExpense(state.expenses, action.payload.id),
      }

    default:
      return state
  }
}
