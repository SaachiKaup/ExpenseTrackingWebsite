import {React, useState} from 'react'
import Card from './src/shared/Card'
import Button from './src/shared/Button'
import TextField from '@mui/material/TextField'
import {SetuTransactions} from './SetuTransactions'
import Link from 'next/link'
//currently redundant. Task: Pass props from this to SetuTransactions
function ConnectBankAccount() {
    const [userMobileNo, setUserMobileNo] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)
    const handleChange = (e) => {
    
        if (e.target.value.length == 10) {
            setBtnDisabled(false)
            setUserMobileNo(e.target.value)
        }
        else {
            setBtnDisabled(true)
            setUserMobileNo('')
        }
        
    }

    /*return (
        <>
        <Card>
        <TextField
            id="mobile-no-input"
            className='text-input'
            placeholder = {'Enter expense'}
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
                onClick = {() => {
                <SetuTransactions mobile_no = {userMobileNo}/>

            }} //has to be verified
                >Connect Bank Acc</Button>
        </Card>
        </> */
    return (
        <div>ConnectBankAccount</div>
    )
}

export default ConnectBankAccount