import Categories from './src/display_components/Categories'
import Header from './src/display_components/Header'
import InputExpense from './src/display_components/InputExpense'
import ViewRecent from './src/display_components/ViewRecent'
import SetBound from './src/display_components/SetBound'
import Link from 'next/link'
import RecentExpensesPage from './RecentExpensesPage'


function App() {
    return (
        <>
        <Header text = "Expense Tracker App"/>
        <Categories />
        <InputExpense />
        <RecentExpensesPage />
        </>
    )
}
export default App
/* From Line 17
<Link href="/RecentExpensesPage">
            <a>View Recent Expenses</a>
        </Link>
        <RecentExpensesPage /> */
/*put back from Line 10
 */

/*
started from line 22
<LocalAverage expense_data = {expense_data}></LocalAverage>
        <ListExpenses expense_data = {expense_data} handle_delete = {handle_delete}/>
*/
/* Intial Imports
import {useState} from 'react' //for delete
import ListExpenses from './src/display_components/ListExpenses'
import LocalAverage from './src/display_components/LocalAverage'
import ExpenseData from './src/data/ExpenseData'
//import GetCategories from './Components/CategoriesTableComponents/GetCategories'


 */

/* Initial delete function

 /*const [expense_data, set_expense_data] = useState(ExpenseData)
    const handle_delete = (id) => {
        if (window.confirm('Delete Confirm?')) {
            set_expense_data(expense_data.filter((expense) => expense.id != id))
        }
    }*/
