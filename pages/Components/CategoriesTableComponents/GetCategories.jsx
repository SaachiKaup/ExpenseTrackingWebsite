/*
import { React, useState } from 'react';
import {MenuItem} from "@mui/material/MenuItem";
const axios = require('axios');

const backendCategories = []
const RetrieveCategoriesArray= (categories) => {
        //setBackendCategories(backendCategories.push(category_name));
        console.log('cats in setCategoriesArray', categories)
        //categories.map(category => {
          //  backendCategories.push(category.cat_name);
        //});
        
        console.log('backend categories', backendCategories)
        return backendCategories || null
}
function GetCategories() {
    //const [backendCategories, setBackendCategories] = useState([]);
    
    axios("http//localhost:3000/api/categories").then((res) =>
        res.json()).then((categories) => {
                console.log('regular categories', categories) 
                RetrieveCategoriesArray(categories)
        }
    );
    return null
}*/

//export default SetCategoriesArray;
/* from line 10 onwards
<div>
        
            <ul>
            {categories.map(category => (
                <li key={category.cat_id}>{category.cat_name}</li>
            ))}
            </ul>
        
      </div> */