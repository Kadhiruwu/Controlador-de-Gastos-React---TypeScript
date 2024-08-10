import { useEffect, useMemo } from "react";
import { useBudget } from "./hooks/useBudgets"
import BugetdForm from "./components/BugetdForm"
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import ExpenseList from "./components/ExpenseList";
import FilterCategory from "./components/FilterCategory";

function App() {

  const {state} = useBudget();

  const isValidBudget = useMemo(() => state.budget > 0 ,[state.budget])

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state]) //escuchamos por todos los cambios que hayan en el state

  return (
    <>
      <header className="bg-purple-500 py-8 max-h-72">
          <h1 className="uppercase text-center font-bold text-3xl text-white">Planificador de gastos</h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
          {isValidBudget ? <BudgetTracker/>  : <BugetdForm/>}
      </div>

      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10 ">
          <FilterCategory/>
          <ExpenseList/>
          <ExpenseModal/>
        </main>
      )}

      <footer >
        <p className="p-4 bg-purple-700 text-white font-bold text-center">Derechos Reservados Kadhir Avila Gallardo </p>
      </footer>
    </>
  )
}

export default App
