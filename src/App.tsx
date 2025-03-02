import { useEffect, useMemo } from 'react'
import { BudgetForm } from './components/BudgetForm'
import { useBudget } from './hooks/useBudget'
import { BudgetTracker } from './components/BudgetTracker'
import { ExpenseModal } from './components/ExpenseModal'
import { ExpenseList } from './components/ExpenseList'
import { FilterByCategory } from './components/FilterByCategory'

function App() {
  const { state } = useBudget()

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
    localStorage.setItem('budget', state.budget.toString())
  }, [state.expenses, state.budget])

  return (
    <div className='min-h-screen bg-slate-50'>
      <header className='bg-gradient-to-r from-blue-600 to-blue-800 py-10 shadow-md'>
        <h1 className='text-center font-black text-4xl text-white max-w-5xl mx-auto px-4'>
          Planificador de Gastos
        </h1>
      </header>

      <div className='max-w-3xl mx-auto bg-white shadow-md rounded-xl mt-10 p-8 transition-all duration-300 hover:shadow-lg'>
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>
      {isValidBudget && (
        <main className='max-w-3xl mx-auto py-10 px-4'>
          <FilterByCategory />
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
    </div>
  )
}

export default App
