import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"


export const useBudget = () => {
    const context = useContext(BudgetContext);
    if(!context){
        throw new Error('Hubo un error en el BudgetProvider')
    }
    return context
}