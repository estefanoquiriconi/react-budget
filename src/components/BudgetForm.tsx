import { ChangeEvent, FormEvent, useState } from 'react'
import { useBudget } from '../hooks/useBudget'

export const BudgetForm = () => {
  const [budget, setBudget] = useState(0)
  const { dispatch } = useBudget()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch({ type: 'ADD_BUDGET', payload: { budget } })
  }

  return (
    <form
      className='space-y-8 max-w-md mx-auto'
      onSubmit={handleSubmit}>
      <div className='flex flex-col space-y-4'>
        <label
          htmlFor='budget'
          className='text-3xl text-blue-600 font-bold text-center'>
          Definir Presupuesto
        </label>
        <input
          id='budget'
          type='number'
          className='w-full bg-slate-50 border border-slate-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
          placeholder='Ej. 50000'
          name='budget'
          value={budget > 0 ? budget : ''}
          onChange={handleChange}
        />
      </div>
      <input
        type='submit'
        value='Definir Presupuesto'
        className='bg-gradient-to-r from-blue-600 to-blue-700 hover:opacity-90 cursor-pointer uppercase w-full p-3 text-white font-bold rounded-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed'
        disabled={isNaN(budget) || budget <= 0}
      />
    </form>
  )
}
