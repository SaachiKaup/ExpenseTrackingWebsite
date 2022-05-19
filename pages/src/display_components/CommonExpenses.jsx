import { Button } from "@mui/material"
import Box from '@mui/material/Box';

function CommonExpenses({text, set_text}) {
    console.log('text:', text == '')
    text = text == '' ? 'No expense entered' : text
    console.log('text:', text)
    const handle_expense = (e) => {
      //console.log(e.target.textContent)
      set_text(e.target.textContent)
        console.log('text:', text)
    }
   
    return (
        <Box sx={{ '& button': { m: 1 } }}>
            <p className='input-label'>Common Expenses:</p>
            <div className='common-expenses-container'>
                    <Button variant = "contained" onClick = {handle_expense}>100</Button>
                    <Button variant = "contained" onClick = {handle_expense}>500</Button>
                    <Button variant = "contained" onClick = {handle_expense}>1000</Button>
            </div>
        </Box>
    )
}

export default CommonExpenses