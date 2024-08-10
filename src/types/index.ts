export type Expense = {
    id: string
    expenseName: string
    amount: number
    category: string
    date: Value
}

export type DraftExpense = Omit<Expense, 'id'>  //Tiene todo menos el id

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type Category ={
    id:string
    name: string
    icon: string
}