import { TextField } from '@mui/material'
import Card from './src/shared/Card'
import Button from './src/shared/Button'
import React, {useState} from 'react'

function InputNumberForTransactions() {
    const [userMobileNo, setUserMobileNo] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)

    const handleChange = (event) => {

    }

    const handleSubmit = (event) => {

    }

    return (
        <Card>
            <TextField
                id="mobile-no-input"
                className='text-input'
                placeholder = {'Enter Mobile Number'}
                text = {userMobileNo}
                onChange = {handleChange}
                sx={{
                    width: 250,
                    height: 50
                }}>

            </TextField>
            <Button className = 'submit-button-central-align' 
                    version = 'primary' 
                    type = 'button' 
                    is_disabled={btnDisabled}
                    onClick = {handleSubmit} //has to be verified
                    >Connect Bank Acc
            </Button>
        </Card>
    )
}

export default InputNumberForTransactions