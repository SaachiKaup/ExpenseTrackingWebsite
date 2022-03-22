import {useState} from 'react'
import Header from './src/display_components/Header'
import InputExpense from './src/display_components/InputExpense'
import ListExpenses from './src/display_components/ListExpenses'
import LocalAverage from './src/display_components/LocalAverage'
import ExpenseData from './src/data/ExpenseData'
//import GetCategories from './Components/CategoriesTableComponents/GetCategories'


function App() {
    const [expense_data, set_expense_data] = useState(ExpenseData)
    const handle_delete = (id) => {
        if (window.confirm('Delete Confirm?')) {
            set_expense_data(expense_data.filter((expense) => expense.id != id))
        }
    }
    
    return (
        <>
        <Header text = "Expense Tracker App"/>
        <InputExpense />
        
        </>
        
    )
}
export default App

/*
started from line 22
<LocalAverage expense_data = {expense_data}></LocalAverage>
        <ListExpenses expense_data = {expense_data} handle_delete = {handle_delete}/>
*/
