export async function CreateExpenseInBackend(expense_inserted, category, categories) {
    const axios = require('axios');
    console.log('in creation function: ', expense_inserted);
    console.log('category while creating: ', category)
    const base_url = 'http://localhost:3000';
    const expense_data = {
        "expenses": {
            "user_id": 4,
            "cat_id": categories.indexOf(category) + 1,
            "daily_amt": Number(expense_inserted),
        }
    };
    console.log('expense_data', expense_data);
    axios.post(base_url + '/api/expenses/create', expense_data).then(
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
