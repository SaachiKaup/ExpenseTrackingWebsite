<<<<<<< HEAD

function LocalAverage({ expenseData }) {
    let average = (expenseData.reduce((accumulated_sum, current) => {
        //console.log('current expense in reduce: ', current)
        return accumulated_sum + current.daily_amt
    }, 0) / expenseData.length).toFixed(1).replace(/[.,]0$/, '')
    
    return (
        <>
        <div className="central-text">Recent Expenses: {expenseData.length}</div>
        <div className="central-text">Local Average: {average}</div>
        </>
  )
}

=======
function LocalAverage({ expense_data }) {
    let average = (expense_data.reduce((accumulated_sum, current) => {
        return accumulated_sum + current.amount
    }, 0) / expense_data.length).toFixed(1).replace(/[.,]0$/, '')
    
    return (
        <>
    <div className="central-text">Recent Expenses: {expense_data.length}</div>
    <div className="central-text">Local Average: {average}</div>
        </>
  )
}

>>>>>>> acad32be1002b2b872ffdccd649db4c868b50623
export default LocalAverage