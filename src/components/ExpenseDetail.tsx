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
      <SwipeAction onClick={() => {}}>Actualizar</SwipeAction>
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
        <div className=' bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center'>
          <div>
            <img
              src={`/icono_${category?.icon}.svg`}
              alt={category?.icon}
              className='w-20'
            />
          </div>
          <div className='flex-1 space-y-2'>
            <p className='text-sm font-bold uppercase text-slate-500'>
              {category?.name}
            </p>
            <p>{expense.expenseName}</p>
            <p className='text-slate-600 text-sm'>{formatDate(expense.date)}</p>
          </div>

          <AmountDisplay amount={expense.amount} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}
