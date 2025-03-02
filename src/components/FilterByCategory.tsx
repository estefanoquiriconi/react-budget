import { ChangeEvent } from 'react'
import { categories } from '../data/categories'
import { useBudget } from '../hooks/useBudget'

export const FilterByCategory = () => {
  const { dispatch } = useBudget()

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'ADD-FILTER_CATEGORY', payload: { id: e.target.value } })
  }

  return (
    <div className='bg-white shadow-md rounded-xl p-6 mb-6'>
      <form>
        <div className='flex flex-col md:flex-row md:items-center gap-4'>
          <label
            htmlFor='category'
            className='text-lg font-medium text-slate-700'>
            Filtrar Gastos
          </label>
          <select
            className='bg-slate-50 p-3 flex-1 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200'
            onChange={handleChange}
            id='category'>
            <option value=''>Todas las categorías</option>
            {categories.map((category) => (
              <option
                value={category.id}
                key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  )
}
