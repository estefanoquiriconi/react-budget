export type Expense = {
  id: string
  expenseName: string
  amount: number
  categoryId: Category['id']
  date: Date
}

export type DraftExpense = Omit<Expense, 'id'>

export interface Category {
  id: string
  name: string
  icon: string
}
