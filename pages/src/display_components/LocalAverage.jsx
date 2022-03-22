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

export default LocalAverage