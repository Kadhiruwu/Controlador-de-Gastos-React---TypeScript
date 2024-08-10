import { useEffect, useState } from "react";
import { categories } from "../data/categories";
import type { DraftExpense, Value } from "../types";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import ErrorMesage from "./ErrorMesage";
import { useBudget } from "../hooks/useBudgets";


export default function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })

    const [error, setError] = useState('')
    const [previousAmount, setPreviousAmount] = useState(0)
    const {dispatch, state, remainingBudget} = useBudget()

    //Editar un gasto
    useEffect(() => {
        if(state.editingId){
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
            setExpense(editingExpense);
            setPreviousAmount(editingExpense.amount)
        }
    }, [state.editingId])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target
        const isAmountField =['amount'].includes(name)
        setExpense({
            ...expense,
            [name] : isAmountField ? +value : value
        })
    }

    const handleChangeDate = (value : Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //Validar
        if(Object.values(expense).includes('')){
            setError('Todos los campos son obligatorios')
            return
        }

        //Validar que no me pase del limite de dinero
        if(expense.amount - previousAmount > remainingBudget){
            setError('Ese Gasto se sale del Presupuesto')
            return
        }


            //Agregar o actualizar un gasto
            if(state.editingId){
                dispatch({type: 'update-expense', payload: {expense: {id: state.editingId, ...expense}}})
            }else{
                dispatch({type: 'add-expense', payload: {expense}})
            }

            //Reiniciar el state
            setExpense({
                amount: 0,
                expenseName: '',
                category: '',
                date: new Date()
            })
        
            setPreviousAmount(0)
    }
  
    return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <legend
            className="uppercase text-center text-2xl text-gray-700 font-black border-b-4 border-blue-500 py-2"
        >{state.editingId ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
        {error && <ErrorMesage>{error}</ErrorMesage>}

        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-xl">Nombre Gasto</label>
            <input type="text" id="expenseName"
            placeholder="Añade el nombre del gasto"
            className="bg-gray-100 rounded-lg  p-2" name="expenseName" value={expense.expenseName} onChange={handleChange} />
        </div>
        
        <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="text-xl">Cantidad</label>
            <input type="number" id="amount"
            placeholder="Añade la cantidad del gasto: Ej. 300"
            className="bg-gray-100 rounded-lg  p-2" name="amount" value={expense.amount} onChange={handleChange}/>
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-xl">Categoria</label>
            <select id="category" value={expense.category}
            className="bg-gray-100 rounded-lg  p-2" name="category" onChange={handleChange}>
                <option value="">-- Seleccione --</option>
                {categories.map(category => (
                    <option key={category.id}
                    value={category.id}>{category.name}</option>
                ))}
            </select>

        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-xl">Fecha Gasto</label>
                <DatePicker
                className="" value={expense.date}
                onChange={handleChangeDate}
                />
        </div>

        </div>

        <input type="submit" className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
        value={state.editingId ? 'Guardar Cambios' : 'Nuevo Gasto'}/>
    </form>
  )
}
