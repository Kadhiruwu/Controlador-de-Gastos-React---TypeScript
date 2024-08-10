import { useMemo } from "react"
import { useBudget } from "../hooks/useBudgets"
import ExpenseDetalle from "./ExpenseDetalle"

export default function ExpenseList() {
    const {state} = useBudget()

    const filterExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory): state.expenses

    const isEmpty = useMemo( () =>filterExpenses.length === 0, [filterExpenses])

  return (
    <div className="mt-10 bg-white shadow-lg rounded-lg p-8">
        {isEmpty ? <p className="text-gray-600 text-2xl font-bold">No haz Realizado Gastos</p> : (
            <>
            <p className="text-gray-600 text-2xl font-bold my-8">Listado de Gastos</p>
            {filterExpenses.map(expense => (
                <ExpenseDetalle
                key={expense.id}
                expense={expense}
                />
            ))}
            </>
        )}
    </div>
  )
}
