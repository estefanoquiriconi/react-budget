import { ChangeEvent, FormEvent, useState } from 'react'
import { useBudget } from '../hooks/useBudget'
import { BudgetActionTypes } from '../reducers/budgetReducer'

export const BudgetForm = () => {
  const [budget, setBudget] = useState(0)
  const { dispatch } = useBudget()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch({ type: BudgetActionTypes.ADD_BUDGET, payload: { budget } })
  }

  return (
    <form
      className='space-y-5'
      onSubmit={handleSubmit}
    >
      <div className='flex flex-col space-y-5'>
        <label
          htmlFor='budget'
          className='text-4xl text-blue-600 font-bold text-center'
        >
          Definir Presupuesto
        </label>
        <input
          id='budget'
          type='number'
          className='w-full bg-white border border-gray-200 p-2'
          placeholder='Ej. 50000'
          name='budget'
          value={budget > 0 ? budget : ''}
          onChange={handleChange}
        />
      </div>
      <input
        type='submit'
        value='Definir Presupuesto'
        className='bg-blue-600 hover:bg-blue-700 cursor-pointer uppercase w-full p-2 text-white font-black disabled:opacity-40 disabled:cursor-not-allowed'
        disabled={isNaN(budget) || budget <= 0}
      />
    </form>
  )
}
