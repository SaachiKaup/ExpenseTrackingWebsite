/* probably does not work
import React from 'react'

function GetExpenses() {
    const [expenses, setExpenses] = React.useState([]);
    fetch("/api/expenses").then((res) =>
            res.json()).then(expenses => {
                setExpenses(expenses)
            });
    return (
      <div>
        
        <ul>
          {expenses.map(expense => (
            <li key={expense.expense_id}>{expense.daily_amt}</li>
          ))}
        </ul>
       
      </div>
    )
}

export default GetExpenses

*/