import { useMemo } from 'react'
import { formatDate } from '../helpers'
import { Expense } from '../types'
import { AmountDisplay } from './AmountDisplay'
import { categories } from '../data/categories'
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { useBudget } from '../hooks/useBudget'

type ExpenseDetailProps = {
  expense: Expense
}

export const ExpenseDetail = ({ expense }: ExpenseDetailProps) => {
  const { dispatch } = useBudget()

  const category = useMemo(
    () => categories.find((category) => category.id === expense.categoryId),
    [expense],
  )

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() =>
          dispatch({ type: 'GET_EXPENSE_BY_ID', payload: { id: expense.id } })
        }>
        Actualizar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() =>
          dispatch({
            type: 'REMOVE_EXPENSE',
            payload: { id: expense.id },
          })
        }
        destructive={true}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}>
        <div className='bg-white shadow-lg p-3 md:p-5 w-full border-b border-gray-200 flex flex-col sm:flex-row gap-3 sm:gap-5 sm:items-center'>
          <div className='flex items-center gap-3 sm:block'>
            <img
              src={`/icono_${category?.icon}.svg`}
              alt={category?.icon}
              className='w-12 sm:w-16 md:w-20'
            />
            <div className='sm:hidden flex-1'>
              <p className='text-sm font-bold uppercase text-slate-500'>
                {category?.name}
              </p>
              <p className='text-sm'>{expense.expenseName}</p>
            </div>
          </div>
          <div className='hidden sm:block flex-1 space-y-2'>
            <p className='text-sm font-bold uppercase text-slate-500'>
              {category?.name}
            </p>
            <p>{expense.expenseName}</p>
            <p className='text-slate-600 text-sm'>{formatDate(expense.date)}</p>
          </div>
          <div className='sm:hidden flex justify-between items-center w-full'>
            <p className='text-slate-600 text-xs'>{formatDate(expense.date)}</p>
            <AmountDisplay amount={expense.amount} />
          </div>
          <div className='hidden sm:block'>
            <AmountDisplay amount={expense.amount} />
          </div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}
