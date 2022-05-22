import React, { useEffect, useState, useContext, useCallback} from 'react'
import axios from 'axios'
import Card from './src/shared/Card'
import Button from './src/shared/Button'
import TextField from '@mui/material/TextField'
import setu_transaction_data from './src/data/TransactionDataSetu'
import { Table, 
        TableHead, 
        TableRow, 
        TableCell, 
        TableBody, 
        styled,
        tableCellClasses, 
        Typography} from '@mui/material'
import DisplaySetuTransactions from './src/display_components/setu_components/DisplaySetuTransactions'
import GetSelectedTransactions from './src/display_components/GetSelectedTransactions'
import { CreateExpenseInBackend } from './src/display_components/CreateExpenseInBackend';
import BackendCategories from './src/data/BackendCategories'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.purple,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const check_null_or_empty = (state_variable) => {
    if (state_variable == null || state_variable == undefined || state_variable == '') {
        return true
    } else {
        return false
    }
}
//true: console.log('Is null or empty?: ', check_null_or_empty(consentID))

const get_consent_id = (req_url) => {
    return req_url.slice(req_url.indexOf('webview/') + 8, req_url.length)
}

const get_promise = (url, id) => {
    return new Promise(async (resolve, reject) => {
        console.log(url + id)
        let url_data = await axios(url + id)
        return resolve(url_data)
    }) //end of promise
}

const get_consent_function = (userMobileNo) => {
    const url_redirect_promise = get_promise('/api/setu/consent/', userMobileNo)
    let consent_id = url_redirect_promise.then(res => {
        console.log('Promise Response: ', res)
        let req_url = res.data
        console.log('URL in Promise', req_url)
        const consent_id_from_url = get_consent_id(req_url)
        return consent_id_from_url}).catch(err => err)
    return consent_id
}

const get_consent_status = (consentID, consent_status) => {
    let url_status_promise = get_promise('/api/setu/check_consent/', consentID)
    
    url_status_promise.then(res => {
        console.log('In promise: Response Status: ', res.data)
        consent_status = res.data
        console.log('In promise Consent Status: ', consent_status)
        return res.data
        }).catch(err => {
            consent_status = err
            return err
        })
    console.log("Consent status in function outside main: ", consent_status, "type: ", typeof consent_status)
    
}

const return_consent_status = (consentID) => {
    
    let url_status_promise = get_promise('/api/setu/check_consent/', consentID)
    let consent_status = url_status_promise.then(res => {
        console.log('In promise: Response Status: ', res.data)
        console.log('In promise Consent Status: ', consent_status)
        return res.data
        }).catch(err => {
            return err
        })
    console.log("Consent status in function outside main: ", consent_status, "type: ", typeof consent_status)
    return consent_status
}

const start_data_session = (consentID) => {
    const url_data_session_promise = get_promise('/api/setu/data_session_start/', consentID)
    let data_session_status = url_data_session_promise.then(res => {
        console.log('Data Session Status: ', res.data)
        return res.data
        }).catch(err => err)
    return data_session_status
}

const get_transaction_data = (dataSessionID) => {
    const url_data_promise = get_promise('/api/setu/get_data/', dataSessionID)
    let transaction_data = url_data_promise.then(res => {
        console.log('Data: ', res.data)
        return res.data
        }).catch(err => err)
    return transaction_data
}

function SetuTransactions() {
    const [fetchedConsent, setFetchedConsent] = useState('') //used to be Not Requested
    const [consentID, setConsentID] = useState('') 
    const [userMobileNo, setUserMobileNo] = useState('') 
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [dataSessionID, setDataSessionID] = useState('') 
    const [transactionData, setTransactionData] = useState([{}, {}])
    const [expensesButton, setExpensesButton] = useState(false)
    const [backendCategories, setBackendCategories] = useState([])
    const currentTransactions = useContext(GetSelectedTransactions)
    
    const loadDataOnlyOnce = useCallback(
      () => {
        console.log("I need a mobile Number: ", userMobileNo)
      },
      [userMobileNo]
    )
    
    useEffect(async () => {
        console.log("Main Component transaction data: ", currentTransactions.selectedTransactions)
        BackendCategories(setBackendCategories)
        console.log("BackendCategories: ", backendCategories)
        if (typeof window !== 'undefined') { 
            if (!check_null_or_empty(window.localStorage.getItem('consentID'))) {
                let consent_id_from_storage = window.localStorage.getItem('consentID')
                setConsentID(consent_id_from_storage)
                console.log('ConsentID from localStorage: ', consentID)
                console.log("Called Only Once")
                let consent_status_promise = get_promise('/api/setu/check_consent/', consent_id_from_storage)
                consent_status_promise.then(res => {
                    console.log('Consent Status: ', res.data)
                    //setFetchedConsent(res.data)
                    //console.log("Fetched Consent Status: ", fetchedConsent)
                    if (res.data == 'ACTIVE') {
                        //console.log("Consent is ACTIVE")
                        setFetchedConsent('ACTIVE')
                        console.log("fetchedConsent: ", fetchedConsent)
                        let url_data_session_promise = get_promise('/api/setu/data_session_start/', consentID)
                        url_data_session_promise.then(data_session_res => {
                            console.log('Data Session ID: ', data_session_res.data)
                            setDataSessionID(res.data)
                            if (data_session_res.data != 'No Data Session') {
                                let url_data_promise = get_promise('/api/setu/get_data/', data_session_res.data)
                                url_data_promise.then(res => {
                                    console.log('Data: ', res.data)
                                    setTransactionData(res.data)
                                    console.log("Transaction Data: ", transactionData)
                                }).catch(err => err)
                            }
                        }).catch(err => err)
                    }
                    else {
                        console.log("Alert please approve consent")
                        //alert("Please approve consent")
                    }
                }).catch(err => {
                    console.log("Error in Consent Status Promise: ", err)
                })
            }       
        }
    }, []) 

    const handleChange = (e) => {
        if (e.target.value.length == 10) {
            setBtnDisabled(false)
            if (window.localStorage.getItem('userMobileNo') === '') {
            setUserMobileNo(e.target.value)
            window.localStorage.setItem('userMobileNo', e.target.value)}
        }
        else {
            setBtnDisabled(true)
            setUserMobileNo('')
            //window.localStorage.removeItem('userMobileNo') //maybe not needed
        }
        console.log('User Mobile No from storage: ', window.localStorage.getItem('userMobileNo'))
        console.log('User Mobile No from state: ', userMobileNo)
    }

    const handleSubmit = (e) => {
        console.log('Submit event: ', e)
        if (check_null_or_empty(consentID)) { 
            let consent_id = get_consent_function(userMobileNo)
            console.log('Consent ID from Function: ', consent_id)
            
            const url_redirect_promise = get_promise('/api/setu/consent/', userMobileNo)
            url_redirect_promise.then(res => {
                console.log('Promise Response: ', res)
                let req_url = res.data
                console.log('URL in Promise', req_url)
                const consent_id = req_url.slice(req_url.indexOf('webview/') + 8, req_url.length)
                setConsentID(consent_id)
                sessionStorage.setItem('consentID', consent_id)
                console.log('Consent ID  from state: ', consentID)
                console.log('Consent ID from session Storage: ', sessionStorage.getItem('consentID'))
                
                const check_consent_status = new Promise (async (resolve, reject) => {
                    let consent_status = await axios('/api/setu/check_consent/' + consent_id)
                    return resolve(consent_status)
                   })
                
                check_consent_status.then(res => {
                    console.log('Consent Status: ', res.data)
                    setFetchedConsent(res.data) //should be pending or accepted after request
                    console.log('Fetched Consent from State: ', fetchedConsent)
                    sessionStorage.setItem('fetchedConsent', fetchedConsent)
                    console.log('Fetched Consent from Session Storage: ', sessionStorage.getItem('fetchedConsent'))
                    })
                        
            if (typeof window !== undefined) {
                window.location.assign(req_url)
                }
            }).catch(err => {
                console.log('Error in promise: ', err)
            })
        }
        else {  
            console.log('Consent ID already exists: ', consentID)
            if (fetchedConsent !== 'ACTIVE') {
                alert('Consent is not ACTIVE')
            }
        }
    }

    const addExpenses = () => {
        console.log('Add Expenses: ', currentTransactions.selectedTransactions)
        console.log(CreateExpenseInBackend)
        currentTransactions.selectedTransactions.forEach(selected_transaction => {
            console.log("Each Selected Transaction: ", selected_transaction)
            console.log("Categories: ", backendCategories)
            CreateExpenseInBackend(selected_transaction[0], 
                selected_transaction[1], backendCategories, selected_transaction[2])
        })
        //Send Expenses to Backend
    }
    return (
        <>
        {('AC' !== 'ACTIVE')? (
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
            <Table> 
                <TableHead >
                    <TableRow >
                        <StyledTableCell align="centre">
                        Amount
                        </StyledTableCell>
                        <StyledTableCell align="center">Transaction Date</StyledTableCell>
                        <StyledTableCell align="center">Description</StyledTableCell>
                        <StyledTableCell align="center">Type</StyledTableCell>
                        <StyledTableCell align="center">Category</StyledTableCell>
                        <StyledTableCell align="center">Selected</StyledTableCell>
                    </TableRow>
                </TableHead>
                {console.log('transaction data while rendering is ?: ', transactionData[0].amount == undefined)}
                {console.log("transaction data: ", transactionData)}
                <TableBody>
                    {transactionData.map(transaction => (
                        <>
                            <DisplaySetuTransactions transaction = {transaction}/>
                        </>
                    ))}    
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell align="right">
                        <Button className = 'submit-button-central-align'
                                version = 'primary'
                                type = 'button'
                                is_disabled={expensesButton}
                                onClick = {addExpenses}>
                                Add Expenses
                        </Button>
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </> //for second else condition
            )
        }
    </>  //for entire main block
    )
}

export default SetuTransactions
