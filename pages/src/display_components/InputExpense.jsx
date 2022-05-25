import { useState, useEffect, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Card from '../shared/Card'
import Button from '../shared/Button'
//import { CreateExpenseInBackend } from './CreateExpenseInBackend';
import { CreateExpenseInBackendFromAPI } from '../../../api_call/CreateExpenseInBackendFromAPI';
import BackendCategories from '../data/BackendCategories';
import GetCurrentCategory from '../../../context/GetCurrentCategory';
//import Button from '@mui/material/Button'


function InputExpense() {
  const category_context = useContext(GetCurrentCategory)
  const [text, setText] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(true)
  //could use message snackbar for type checking
  const [backendCategories, getBackendCategories] = useState([]);
  useEffect(() => {
    BackendCategories(getBackendCategories)
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
        console.log(CreateExpenseInBackendFromAPI)
        console.log('category on submission:', category_context.category)
        CreateExpenseInBackendFromAPI(text, category_context.category, backendCategories);
        setText('');
    }
  return (
    <Card>
        <h2 className='input-label'>Log Expense</h2> 
        <TextField
          id="expense-text-input"
          className='text-input'
          placeholder = {'Enter expense'}
          value = {text}
          text = {text}
          onChange = {handleChange}
          sx={{
            width: 250,
            height: 50
          }}
        > </TextField>
        
        <Button className = 'submit-button-central-align' 
                version = 'secondary' 
                type = 'button' 
                is_disabled={btnDisabled}
                onClick = {handleSubmit} //has to be verified
                >Log Expense</Button>
        
    </Card>
  )
}

/*Not included because does not work with button
<CommonExpenses text = {text} setText = {setText}></CommonExpenses> */

export default InputExpense