import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Card from '../shared/Card'
import Button from '../shared/Button'
import CommonExpenses from './CommonExpenses';
import Categories from './Categories';

function InputExpense() {
  const [text, set_text] = useState('')
  const [btn_disabled, set_btn_disabled] = useState(true)
  //could use message snackbar for type checking

  const handle_change = (e) => {
    console.log('e:', e.target.value)
    if (e.target.value === '') {
  
      set_btn_disabled(true)
    }
    else {
      
      set_btn_disabled(false)
      
    }
    set_text(e.target.value)
  }

  
  return (
    <Card input = {true}>
        
        <h2 className='input-label'>Log Expense</h2> 
        <TextField
          id="expense-text-input"
          className='text-input align-button'
          placeholder = {'Enter expense'}
          value = {text}
          text = {text}
          onChange = {handle_change}
          sx={{
            width: 250,
            height: 50
          }}
        />

        <h2 className='input-label'>Expense Category</h2>
        <Categories></Categories>
        <Button className = 'submit-button central align' version = 'secondary' type = 'button' is_disabled={btn_disabled}>
          Log Expense
        </Button>

    </Card>
  )
}

/*Not included because does not work with button
<CommonExpenses text = {text} set_text = {set_text}></CommonExpenses> */

export default InputExpense