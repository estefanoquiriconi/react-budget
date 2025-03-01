import { DraftExpense, Expense } from '../types'

export type BudgetActions =
  | { type: 'ADD_BUDGET'; payload: { budget: number } }
  | { type: 'TOGGLE_MODAL' }
  | { type: 'ADD_EXPENSE'; payload: { expense: DraftExpense } }
  | { type: 'REMOVE_EXPENSE'; payload: { id: Expense['id'] } }
  | { type: 'GET_EXPENSE_BY_ID'; payload: { id: Expense['id'] } }
  | { type: 'UPDATE_EXPENSE'; payload: { expense: Expense } }

export type BudgetState = {
  budget: number
  modal: boolean
  expenses: Expense[]
  editingId: Expense['id']
}

const getStoredData = {
  budget: (): number => {
    const budget = localStorage.getItem('budget')
    return budget ? +budget : 0
  },

  expenses: (): Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses')
    if (!localStorageExpenses) return []

    const expenses: Expense[] = JSON.parse(localStorageExpenses)
    return expenses.map((expense) => ({
      ...expense,
      date: new Date(expense.date),
    }))
  }
}

export const initialState: BudgetState = {
  budget: getStoredData.budget(),
  modal: false,
  expenses: getStoredData.expenses(),
  editingId: '',
}

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions,
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
        editingId: '',
      }

    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [
          ...state.expenses,
          { id: crypto.randomUUID(), ...action.payload.expense },
        ],
        modal: false,
      }

    case 'REMOVE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload.id,
        ),
      }

    case 'GET_EXPENSE_BY_ID':
      return {
        ...state,
        modal: true,
        editingId: action.payload.id,
      }

    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.expense.id
            ? action.payload.expense
            : expense,
        ),
        modal: false,
        editingId: '',
      }

    default:
      return state
  }
}
