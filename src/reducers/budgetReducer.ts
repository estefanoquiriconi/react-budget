export enum BudgetActionTypes {
  ADD_BUDGET = 'ADD_BUDGET',
}

export type BudgetActions = {
  type: BudgetActionTypes.ADD_BUDGET
  payload: { budget: number }
}

export type BudgetState = {
  budget: number
}

export const initialState: BudgetState = {
  budget: 0,
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

    default:
      return state
  }
}
