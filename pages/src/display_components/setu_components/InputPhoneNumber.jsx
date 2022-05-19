import React, {useEffect, useContext, useState} from 'react'
import Card from '../../shared/Card'
import Button from '../../shared/Button'
import { TextField } from '@mui/material'

function InputPhoneNumber() {
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [userMobileNo, setUserMobileNo] = useState('')
  const handleSubmit = () => {}
  const handleChange = () => {}

  return (
    <>
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
            }}  
        ></TextField>
        <Button className = 'submit-button-central-align' 
                version = 'primary' 
                type = 'button' 
                is_disabled={btnDisabled}
                onClick = {handleSubmit} //has to be verified
                >Connect Bank Acc</Button>
        </Card>)
    </>
  )
}

export default InputPhoneNumber