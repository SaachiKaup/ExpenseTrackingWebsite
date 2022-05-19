import React from 'react'
import { useState, useEffect, useContext } from 'react';
import {TextField} from "@mui/material";
import Card from '../shared/Card'
import Button from '../shared/Button'
import { UpdateBoundInBackend } from './UpdateBoundInBackend';
import CategoriesData from './CategoriesData';
import GetCurrentCategory from './GetCurrentCategory';

function SetBound() {
  const category_context = useContext(GetCurrentCategory)
  const [text, setText] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [backendCategories, getBackendCategories] = useState([]);
  useEffect(() => {
    CategoriesData(getBackendCategories)
    //console.error(backendCategories)
  }, [])
  //console.log('in input backend categories', backendCategories) 

  const handleChange = (e) => {
    console.log('e:', e.target.value)
    if (e.target.value === '') {
      setBtnDisabled(true)
    }
    else {
      setBtnDisabled(false)
    }
    setText(e.target.value)
  }
  
  const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit');
        console.log('text:', text);
        console.log(UpdateBoundInBackend)
        console.log('category on submission:', category_context.category)
        UpdateBoundInBackend(text, category_context.category, backendCategories);
        setText('');
    }

  
  return (
    
    <Card>
      {/*<div className='container-central-align'> */}
        <h2 className='input-label'>Set Bound</h2> 
        <TextField
          id="expense-text-input"
          className='text-input align-button'
          placeholder = {'Enter Upper Bound'}
          value = {text}
          text = {text}
          onChange = {handleChange}
          sx={{
            width: 250,
            height: 50
          }}
        > </TextField>
        
        <Button className = 'submit-button central-align' 
                version = 'secondary' 
                type = 'button' 
                is_disabled={btnDisabled}
                onClick = {handleSubmit} //has to be verified
                >
          Set Bound
        </Button>
        {/*</div>*/}
    </Card>
    
  )
}


export default SetBound