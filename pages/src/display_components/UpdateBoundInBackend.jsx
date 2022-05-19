export async function UpdateBoundInBackend(bound_changed, category, categories) {
    const axios = require('axios');
    console.log('in update function: ', bound_changed);
    console.log('category while creating: ', category)
    const base_url = 'http://localhost:3000';
    const bound_query = new URLSearchParams({
        "user_id": 1,
        "cat_id": categories.indexOf(category) + 1,
    }).toString();
    const bound_data = {
        "upper_bound": Number(bound_changed)
    }
    console.log('bound_data', bound_data);
    console.log('bound_query', bound_query);
    axios.post(new URL(base_url + '/api/set_bound/update?' + bound_query), 
        bound_data).then(
        res => {
            console.log('res data', res.data);
        }
    )
        .catch(err => {
            console.log(err);
        }
        );
    
    return bound_data || null;
}
