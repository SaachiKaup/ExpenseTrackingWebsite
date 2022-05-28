import React from 'react'

async function BackendCategories(setState) {
    console.log("In Backend Categories")
    const axios = require('axios');
    //const base_url = 'http://localhost:3000'
    const base_url = 'https://expense-tracking-website-git-master-saachikaup.vercel.app'
    const request_url = base_url + '/api/categories'
    let backend_categories = [];
    let axios_headers = {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        } 
    };
    axios.get('/api/categories', null, axios_headers).then(
        res => {
            console.log("Categories Axios: ", res)
            res.data.forEach(category => {
                backend_categories.push(category.cat_name)
                
            });
            setState(backend_categories)
        }).catch(err => {
            console.error("Axios Err:", err);
    })
    //console.log('backend categories', backend_categories)
    return backend_categories || null
}

export default BackendCategories