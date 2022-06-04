export async function CreateUserInBackendFromAPI(user_data_json) {
    const axios = require('axios');
    console.log('api_call/ in user creation function: ', user_data_json);
    //const base_url = 'http://localhost:3000';
    const base_url = 'https://expense-tracking-website-git-master-saachikaup.vercel.app'
    const user_data = JSON.stringify({
        "users": {
            "name": user_data_json.name,
            "email": user_data_json.email,
            "mobile_number": user_data_json.mobile_number,
        }
    });
    var config = {
        method: 'post',
        url: '/api/users/create',
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*"
        },
        data : user_data
    };
    console.log('user_data', user_data);
    //axios.post(base_url + '/api/expenses/create', expense_data).then(
    axios(config).then(
        axios_user_res => {
            console.log('axios user res data', axios_user_res.data);
        }
    )
        .catch(err => {
            console.log(err);
        }
        );
    return user_data || null;
}

//export default CreateExpenseInBackend;