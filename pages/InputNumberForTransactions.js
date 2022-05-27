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

const get_cropped_consent_id_from_url = (req_url) => {
    return req_url.slice(req_url.indexOf('webview/') + 8, req_url.length)
}

const get_consent_id = (userMobileNo) => {
    const url_redirect_promise = get_promise('/api/setu/consent/', userMobileNo)
    let consent_id = url_redirect_promise.then(res => {
        console.log('Promise Response: ', res)
        let req_url = res.data
        console.log('URL in Promise', req_url)
        const consent_id_from_url = get_cropped_consent_id_from_url(req_url)
        return consent_id_from_url}).catch(err => err)
    return consent_id
}

const get_consent_with_status_and_mobile_number_from_local_storage = () => {
    const local_storage_consentID = get_local_storage_item('consentID')
    const local_storage_consentStatus = get_local_storage_item('consentStatus')
    const local_storage_userMobileNo = get_local_storage_item('userMobileNo')
    return [local_storage_consentID, local_storage_consentStatus, local_storage_userMobileNo]
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
        const [local_storage_userMobileNo, 
                local_storage_consentID, 
                local_storage_consentStatus] = 
        get_consent_with_status_and_mobile_number_from_local_storage()
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