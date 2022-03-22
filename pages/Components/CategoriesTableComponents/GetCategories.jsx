
import { React, useState } from 'react';
import {MenuItem} from "@mui/material/MenuItem";

const backendCategories = []
const SetCategoriesArray= (categories) => {
        //setBackendCategories(backendCategories.push(category_name));
        console.log('cats in setCategoriesArray', categories)
        /*categories.map(category => {
            backendCategories.push(category.cat_name);
        });*/
        
        console.log('backend categories', backendCategories)
        return backendCategories || null
}
function GetCategories() {
    //const [backendCategories, setBackendCategories] = useState([]);
    
    fetch("/api/categories").then((res) =>
        res.json()).then((categories) => {
                console.log('regular categories', categories) 
                SetCategoriesArray(categories)
        }
    );
    return null
}

/*export default SetCategoriesArray;
/* from line 10 onwards
<div>
        
            <ul>
            {categories.map(category => (
                <li key={category.cat_id}>{category.cat_name}</li>
            ))}
            </ul>
        
      </div> */