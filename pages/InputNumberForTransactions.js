import { TextField } from '@mui/material'
import Card from './src/shared/Card'
import Button from './src/shared/Button'
import React, {useEffect, useState} from 'react'
import SetuTransactions from './SetuTransactions'
import axios from 'axios'

const check_null_or_empty = (state_variable) => {
    if (state_variable == null || state_variable == undefined || state_variable == '' || state_variable == ' ') {
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

const get_promise = (url, id) => {
    return new Promise(async (resolve, reject) => {
        console.log(url + id)
        let url_data = await axios(url + id)
        return resolve(url_data)
    }) //end of promise
}

const set_window_local_storage_consent_id_and_status = (consent_id) => {
    window.localStorage.setItem('consentID', consent_id)
    window.localStorage.setItem('consentStatus', 'PENDING')
}

const get_consent_id_promise = (userMobileNo) => {
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
    return [local_storage_userMobileNo, local_storage_consentID, local_storage_consentStatus]
}

function InputNumberForTransactions() {
    const [userMobileNo, setUserMobileNo] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [consentStatus, setConsentStatus] = useState('') //consentStatus would be a better name for consentStatus

    useEffect(() => {
        const [local_storage_userMobileNo, local_storage_consentID, local_storage_consentStatus] = get_consent_with_status_and_mobile_number_from_local_storage()
        if (!check_null_or_empty(window.localStorage.getItem('userMobileNo'))) {
            console.log("Mobile Present")
        }
        if (!check_null_or_empty(window.localStorage.getItem('consentID'))) {
            console.log("In Storage ConsentID Present:", window.localStorage.getItem('consentID'))
        }
        
        if (!check_null_or_empty(window.localStorage.getItem('consentStatus'))) {
            let consent_status_from_storage = window.localStorage.getItem('consentStatus')
            setConsentStatus(consent_status_from_storage)
            console.log('Fetched Consent: ', consentStatus)
            if (consent_status_from_storage == 'ACTIVE') {
                console.log("Consent is active")
                //get_transaction_data()
            }
            else {
                console.log("Inactive cosnent: Add alert")
            }
        }
             
    }, []);
    const handleChange = (event) => {
        let event_target_value = event.target.value
        if (event_target_value.length == 10) {
            setBtnDisabled(false)
            window.localStorage.setItem('userMobileNo', event_target_value)
            
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
        //console.log("local storage number: ", local_storage_userMobileNo, "id: ", local_storage_consentID, "status: ", local_storage_consentStatus)
        if (check_null_or_empty(local_storage_consentID)) { 
            //console.log("consent id not currently present")
            let consent_id_promise = get_consent_id_promise(local_storage_userMobileNo)
            consent_id_promise.then(res => {
                let consent_id_from_promise = res
                //console.log("ConsentID from Promise: ", consent_id_from_promise)
                set_window_local_storage_consent_id_and_status(consent_id_from_promise)
                console.log("Local storage: ", window.localStorage)
                //window.location.assign('https://fiu-uat.setu.co/consents/webview/' + consent_id_from_promise)
            }).catch(err => console.log(err))
        }
        else {
            alert("Consent ID already present in local storage")
        }
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