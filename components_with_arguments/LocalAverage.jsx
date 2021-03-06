function LocalAverage({ expenseData }) {
    let average = (expenseData.reduce((accumulated_sum, current) => {
        //console.log('current expense in reduce: ', current)
        return accumulated_sum + current.daily_amt
    }, 0) / expenseData.length).toFixed(1).replace(/[.,]0$/, '')
    
    return (
        <>
        <div className="central-text">Weekly Expenses: {expenseData.length}</div>
        <div className="central-text">Weekly Average: {average}</div>
        </>
  )
}

export default LocalAverage