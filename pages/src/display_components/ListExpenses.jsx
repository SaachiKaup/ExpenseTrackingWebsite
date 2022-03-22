import RecentExpenses from './RecentExpenses'

function ListExpenses({expense_data, handle_delete}) {
    return (
       <div className = "expense-list central-text">
           {    //takes a parameter, returns JSX in round brackets
               expense_data.map((expense) => (
                    <RecentExpenses expense = {expense} handle_delete = {handle_delete}/>
               ))
           }
       </div>
    )
    
}
export default ListExpenses