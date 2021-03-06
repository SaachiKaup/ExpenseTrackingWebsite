function get_range_value(range_string) {
    const range ={
    'weekly': 7,
    'monthly': 31,
    'yearly': 365}
    return range[range_string]
}

function check_expense_range(expense, range_string) {
    const range_value = get_range_value(range_string)
    //console.log('range val:', range_value)
    let LB_date = new Date()
    let UB_date = new Date()
    LB_date.setDate(LB_date.getDate() - range_value)
    const expense_date = new Date(expense.expense_date)
    return  expense_date <= UB_date && expense_date >= LB_date
}
async function BackendExpenseData(setState) {
    const axios = require('axios');
    //const base_url = 'http://localhost:3000'
    const base_url = 'https://expense-tracking-website-git-master-saachikaup.vercel.app'
    const request_url = base_url + '/api/expenses' 
    let axios_headers = {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        } 
    };
    let backendExpenses= [];
    axios.get('/api/expenses', null, axios_headers).then(
        res => {
            res.data.forEach(expense => {
                if (check_expense_range(expense, 'weekly')){
                    //console.log('backend expense', expense.expense_id)
                    backendExpenses.push(expense)
                }
            });
            console.log('All expenses: ', backendExpenses)
            backendExpenses.sort(function(a, b){
                return new Date(b.expense_id) - new Date(a.expense_id);
            });

            setState(backendExpenses)
        }).catch(err => {
            console.error(err);
    })
    //console.log('backend expenses', backendExpenses)
    return backendExpenses || null
}

export default BackendExpenseData