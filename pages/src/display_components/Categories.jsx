<<<<<<< HEAD
import * as React from "react";
import {Menu, MenuItem, Fade, Button, Typography} from "@mui/material";
import { useState, useEffect, useContext } from "react";
import GetCurrentCategory from './GetCurrentCategory'
import { useRouter } from 'next/router'
import MyButton from '../shared/Button'
import Card from "../shared/Card";
//import { isAwaitExpression } from "typescript";

function Categories() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [category, setCategory] = useState("Categories");
  const current_category_context = useContext(GetCurrentCategory)
  console.error('current category:', current_category_context.category)
  const open = Boolean(anchorEl);
  const [backend_categories, setBackendCategories] = useState([]);
  const router = useRouter()
  const [btnDisabled, setBtnDisabled] = useState(true)
  //setBackendCategories(backend_categories => GetCategoriesFromAxios([]))
  useEffect(() => {
     getCategoriesFromState();
  }, []);
  const sendCategory = useEffect(() => {
      console.log('category:', category)

  }, [])
  const getCategoriesFromState = () => {
      const axios = require('axios');
      const base_url = 'http://localhost:3000'
      let backend_categories = [];
      axios.get('http://localhost:3000/api/categories').then(
            res => {
              res.data.forEach(category => {
                  backend_categories.push(category.cat_name)
              });
              setBackendCategories(backend_categories);
              setBtnDisabled(false)
            }).catch(err => {
              console.log(err);
            })
  }
  

  const handleClick = (event) => {
    console.log('on clicking', event.currentTarger)
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    console.log('on closing', typeof e.target.innerText );
    if (e.target.innerText === '') {
      console.log('closed to soon')
      setCategory("Categories");
    }
    else {
      setCategory(e.target.innerText);
      current_category_context.category = e.target.innerText
      console.log('cat context: ', current_category_context)

    }
    setAnchorEl(null)
  };
  const onClick = (e) => {
    e.preventDefault()
    console.log('clicked')
    router.push('/SetBoundPage')
  }

  return (
    <Card input={true}> {/*Used to be just a div with SetBound */}
      <Typography align='center'>
      <Button
        id="fade-button"
        variant = "outlined"
        className="text-input"
        //aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        
        text={category}
        size = 'large'
        sx={{
          width: 250,
          height: 50,
          marginLeft: 0,
        }}
      >
        {category}
      </Button>
      </Typography>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button"
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
      
        {backend_categories.map(category => (
          <MenuItem onClick={handleClose}>{category}</MenuItem>
        ))}
        
      </Menu>
      {/*<Card input={true}>
      <MyButton className = 'submit-button-central-align' 
                version = 'secondary' 
                type = 'button'
                onClick={onClick}
                is_disabled={btnDisabled}
                >Set Bound</MyButton>
        </Card> */}
    </Card>
  );
} 

export default Categories;

/*function SetCategoriesArray(backend_categories) {
        console.log('In SetCategoriesArray function');
        
        const base_url = 'http://localhost:3000'
        console.log('new url: ', base_url + '/api/categories');
        fetch(new URL(base_url + '/api/categories').then((res) =>
        res.json()).then((categories) => {
                console.log('regular categories', categories) 
          
                categories.forEach(category => {
                    backend_categories.push(category.cat_name);
                });
        
        console.log('backend categories', backend_categories)
        
        }))
        
        return backend_categories || null
  } */

//Originally from line 5
  /*const res = await axios.get(base_url + '/api/categories');
  console.log(res.data);
  const categories = res.data.forEach(category => {
    removed for now: backend_categories.push(category.cat_name);
    //console.log(category.cat_name)
  })*/
  //alt way

//originally from line 10 after above part is removed
/*async function GetCategoriesFromAxios(backend_categories) {
  const axios = require('axios');
  console.log('initial backend categories', backend_categories);
  const base_url = 'http://localhost:3000'
  console.log('new url: ', base_url + '/api/categories');  
  axios.get('http://localhost:3000/api/categories').then(
      res => {
          res.data.forEach(category => {
            backend_categories.push(category.cat_name)});
      })
        .catch(err => {
          console.log(err);
  })

  console.log('backend categories', backend_categories)
  return backend_categories || null
}

/*const global_backend_categories = GetCategoriesFromAxios([])
const categories = ["Food", "Options", "Dead"]*/
=======
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useState } from "react";

const SetCategoriesArray = (backend_categories) => {
        fetch("/api/categories").then((res) =>
        res.json()).then((categories) => {
                console.log('regular categories', categories) 
          
                categories.forEach(category => {
                    backend_categories.push(category.cat_name);
                });
        
        console.log('backend categories', backend_categories)
        
        })
        return backend_categories || null
  }

const global_backend_categories = SetCategoriesArray([])

function Categories() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [text, setText] = useState("Categories");
  const open = Boolean(anchorEl);
  const [backend_categories, setBackendCategories] = useState([]);
  
  const onLoading = () => {
    console.log('In loading function');
    setBackendCategories(backend_categories => SetCategoriesArray([]));
  }

  const handleClick = (event) => {
    onLoading()
    console.log('on clicking', event.currentTarger)
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    console.log('on closing', e.target);
    setText(e.target.innerText);
    setAnchorEl(null)
  };

  return (
    <div>
      <Button
        id="fade-button"
        variant = "outlined"
        className="central-align text-input"
        //aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        
        text={text}
        size = 'large'
        sx={{
          width: 250,
          height: 50,}}
      >
        {text}
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button"
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
      
        {global_backend_categories.map((category) => (
          <MenuItem onClick={handleClose}>{category}</MenuItem>
        ))}
        
      </Menu>
    </div>
  );
} 

export default Categories;

/* originally from line 8 onwards
const categories = ["Food", "Entertainment", "Travel"]; //make it to get categories from api

 */

/* originally from line 36 onwards
fetch("/api/categories").then((res) =>
        res.json()).then((categories) => {
                console.log('regular categories', categories) 
                SetCategoriesArray(categories)
        }
    ); */
>>>>>>> acad32be1002b2b872ffdccd649db4c868b50623
