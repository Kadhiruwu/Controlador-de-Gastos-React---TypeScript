import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudgets";
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export default function BudgetTracker() {
    const {state, totalExpenses, remainingBudget, dispatch} = useBudget()
    const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
            <CircularProgressbar
                value={percentage}
                styles={buildStyles({
                    pathColor: percentage > 90 ?  '#DC2626' : 'purple',
                    trailColor: '#f5f5',
                    textSize: 8,
                    textColor: percentage > 90 ?  '#DC2626' : 'purple',
                })}
                text={`${percentage}% Gastado`}
            />
        </div>

        <div className="flex flex-col justify-center items-center gap-8">
        <AmountDisplay
            label="Presupuesto"
            amount= {state.budget}
            /> 

        <AmountDisplay
            label="Gastado"
            amount= {totalExpenses}
        />   
        <AmountDisplay
            label="Disponible"
            amount= {remainingBudget}
        />  

            <button type="button" className="bg-purple-600 w-full p-2 text-white uppercase font-bold rounded-lg"
            onClick={() => dispatch({type: 'reset-app'})}>
                Resetear App
            </button>

            
        </div>
    </div>
  )
}
