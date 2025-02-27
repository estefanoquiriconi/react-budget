import { ChangeEvent, useState } from 'react'

export const BudgetForm = () => {
  const [budget, setBudget] = useState(0)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber)
  }

  return (
    <form className='space-y-5'>
      <div className='flex flex-col space-y-5'>
        <label
          htmlFor='budget'
          className='text-4xl text-blue-600 font-bold text-center'>
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
