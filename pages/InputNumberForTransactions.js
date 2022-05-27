import { TextField } from '@mui/material'
import Card from './src/shared/Card'
import Button from './src/shared/Button'
import React, {useState} from 'react'
import SetuTransactions from './SetuTransactions'


const check_null_or_empty = (state_variable) => {
    if (state_variable == null || state_variable == undefined || state_variable == '') {
        return true
    } else {
        return false
    }
}

const get_local_storage_item = (item_name) => {
    return window.localStorage.getItem(item_name)
}


function InputNumberForTransactions() {
    const [userMobileNo, setUserMobileNo] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [consentStatus, setConsentStatus] = useState('') //consentStatus would be a better name for consentStatus



    const handleChange = (event) => {
        let event_target_value = event.target.value
        if (event_target_value.length == 10) {
            setBtnDisabled(false)
            if (window.localStorage.getItem('userMobileNo') === '') {
                window.localStorage.setItem('userMobileNo', event_target_value)
            }
        }
        else {
            setBtnDisabled(true)
            setUserMobileNo('')
            window.localStorage.setItem('userMobileNo', '')
            //window.localStorage.removeItem('userMobileNo') //maybe not needed
        }
        console.log('User Mobile No from storage: ', get_local_storage_item("userMobileNo"))
    }

    const handleSubmit = (event) => {
        console.log("Submit event Fired with event: ", event)
        const local_storage_userMobileNo = get_local_storage_item('userMobileNo')
        const local_storage_consentID = get_local_storage_item('consentID')
        const local_storage_consentStatus = get_local_storage_item('consentStatus')
        console.log("local storage number: ", local_storage_userMobileNo, "id: ", local_storage_consentID, "status: ", local_storage_consentStatus)
    }

    return (
        <div>
        {(consentStatus !== 'ACTIVE')? (
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
            </Card> ) : (
                <>
                <SetuTransactions />
                </>
            )}
    </div>)
}

export default InputNumberForTransactions