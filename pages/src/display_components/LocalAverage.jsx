//Make it to Weekly Average
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

export default LocalAverage