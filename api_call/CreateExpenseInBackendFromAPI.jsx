export async function CreateExpenseInBackendFromAPI(expense_inserted, category, categories, expense_date = false) {
    if(expense_date == false || expense_date == null || expense_date == '') {
        expense_date = new Date();
    }
    else {
        expense_date = new Date(expense_date);
    }
    const axios = require('axios');
    console.log('api_call/ creation function: ', expense_inserted);
    console.log('category while creating: ', category)
    console.log("date while creating: ", expense_date)
    //const base_url = 'http://localhost:3000';
    const base_url = 'https://expense-tracking-website-git-master-saachikaup.vercel.app'
    const expense_data = JSON.stringify({
        "expenses": {
            "user_id": 4,
            "cat_id": categories.indexOf(category) + 1,
            "daily_amt": Number(expense_inserted),
            "expense_date": expense_date
        }
    });
    var config = {
        method: 'post',
        url: '/api/expenses/create',
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*"
        },
        data : expense_data
    };
    console.log('expense_data', expense_data);
    //axios.post(base_url + '/api/expenses/create', expense_data).then(
    axios(config).then(
        res => {
            console.log('res data', res.data);
        }
    )
        .catch(err => {
            console.log(err);
        }
        );
    return expense_data || null;
}

//export default CreateExpenseInBackend;