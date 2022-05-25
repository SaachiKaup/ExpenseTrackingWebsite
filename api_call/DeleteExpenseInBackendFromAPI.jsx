export async function DeleteExpenseInBackendFromAPI(expense_id) {
    const axios = require('axios');
    console.log('in deletion function: ', typeof expense_id);

    const base_url = 'http://localhost:3000';
    const expense_data = {
        "expense_id": expense_id
    };
    console.log('expense_data', expense_data);
    axios.post(new URL(base_url + '/api/expenses/delete'), expense_data).then(
        res => {
            console.log('res data', res.data);
        }
    )
        .catch(err => {
            console.error('error data', err);
        }
        );
    return expense_data || null;
}