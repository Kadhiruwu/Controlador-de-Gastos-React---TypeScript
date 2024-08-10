import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudgets";

export default function BugetdForm() {
    const [budget, setBudget] = useState(0);
    const {dispatch} = useBudget();

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }

    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0 
    }, [budget])

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      dispatch({type: 'add-budget', payload: {budget}})
    }
    
  return (
    <form className="space-y-5" onSubmit={handleSubmit }>
        <div className="flex flex-col space-y-5">  
            <label htmlFor="bugdet" className="text-3xl text-purple-600 text-center">Definir Presupuesto</label>
            <input type="number"
             className="w-full bg-white border border-gray-400 p-2" 
             placeholder="Define tu presupuesto" id="budgetID" name="budget" value={budget} onChange={handleChange}/>
        </div>

        <input type="submit" value='Definir presupuesto' 
        className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer w-full p-2
        font-bold disabled:opacity-30" disabled={isValid} />
    </form>
  )
}
