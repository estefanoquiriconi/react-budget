import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { DraftExpense } from '../types'
import { categories } from '../data/categories'
import { ErrorMessage } from './ErrorMessage'
import { useBudget } from '../hooks/useBudget'

const initialState = {
  expenseName: '',
  amount: 0,
  categoryId: '',
  date: new Date(),
}

export const ExpenseForm = () => {
  const [expense, setExpense] = useState<DraftExpense>(initialState)
  const [error, setError] = useState('')
  const [previousAmount, setPreviousAmount] = useState(0)
  const { state, dispatch, remainingBudget } = useBudget()

  useEffect(() => {
    const editingExpense = state.editingId
      ? state.expenses.find((expense) => expense.id === state.editingId)
      : null

    if (editingExpense) {
      setExpense(editingExpense)
      setPreviousAmount(editingExpense.amount)
    }
  }, [state.editingId, state.expenses])

  const handleChangeDate = (date: Date | null) => {
    if (!date) return
    setExpense({
      ...expense,
      date,
    })
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    const isAmountField = ['amount'].includes(name)
    setExpense({
      ...expense,
      [name]: isAmountField ? +value : value,
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (Object.values(expense).includes('')) {
      setError('Todos los campos son obligatorios')
      return
    }

    if (remainingBudget < expense.amount - previousAmount) {
      setError('Superas el presupuesto disponible')
      return
    }

    if (state.editingId) {
      dispatch({
        type: 'UPDATE_EXPENSE',
        payload: { expense: { id: state.editingId, ...expense } },
      })
    } else {
      dispatch({ type: 'ADD_EXPENSE', payload: { expense } })
    }

    setExpense(initialState)
    setError('')
    setPreviousAmount(0)
  }

  return (
    <form
      className='space-y-6'
      onSubmit={handleSubmit}>
      <legend className='text-center text-2xl font-bold text-blue-600 border-b-2 border-blue-200 pb-2 mb-6 uppercase'>
        {state.editingId ? 'Editar Gasto' : 'Nuevo Gasto'}
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className='flex flex-col space-y-2'>
        <label
          htmlFor='expenseName'
          className='text-slate-700 font-medium'>
          Nombre Gasto:
        </label>
        <input
          type='text'
          id='expenseName'
          name='expenseName'
          placeholder='Añade el nombre del gasto'
          className='bg-slate-50 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200'
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>

      <div className='flex flex-col space-y-2'>
        <label
          htmlFor='amount'
          className='text-slate-700 font-medium'>
          Cantidad:
        </label>
        <input
          type='number'
          id='amount'
          name='amount'
          placeholder='Añade la cantidad del gasto. Ejemplo: 300'
          className='bg-slate-50 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200'
          value={expense.amount > 0 ? expense.amount : ''}
          onChange={handleChange}
        />
      </div>

      <div className='flex flex-col space-y-2'>
        <label
          htmlFor='categoryId'
          className='text-slate-700 font-medium'>
          Categoría:
        </label>
        <select
          id='categoryId'
          name='categoryId'
          className='bg-slate-50 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200'
          value={expense.categoryId}
          onChange={handleChange}>
          <option value=''>Seleccione</option>
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className='flex flex-col space-y-2'>
        <label
          htmlFor='date'
          className='text-slate-700 font-medium'>
          Fecha Gasto:
        </label>
        <DatePicker
          id='date'
          name='date'
          className='w-full bg-slate-50 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200'
          selected={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input
        type='submit'
        value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'}
        className='bg-gradient-to-r from-blue-600 to-blue-700 cursor-pointer w-full p-3 text-white font-bold rounded-lg hover:opacity-90 transition-all duration-300 uppercase'
      />
    </form>
  )
}
