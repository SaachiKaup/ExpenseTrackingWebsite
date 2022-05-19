/*import React from 'react'

async function CategoriesData(setState) {
    const axios = require('axios');
    const base_url = 'http://localhost:3000'
    let backend_categories = [];
    axios.get('http://localhost:3000/api/categories').then(
        res => {
            res.data.forEach(category => {
                backend_categories.push(category.cat_name)
                
            });
            setState(backend_categories)
        }).catch(err => {
            console.error(err);
    })
    //console.log('backend categories', backend_categories)
    return backend_categories || null
}

export default CategoriesData */