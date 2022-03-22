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