import React, { useEffect, useState, useContext, useCallback} from 'react'
import axios from 'axios'
import Card from './src/shared/Card'
import Button from './src/shared/Button'
import TextField from '@mui/material/TextField'
import setu_transaction_data from '../data/TransactionDataSetu.json'
import { Table, 
        TableHead, 
        TableRow, 
        TableCell, 
        TableBody, 
        styled,
        tableCellClasses, 
        Typography} from '@mui/material'
import DisplaySetuTransactions from '../components_with_arguments/DisplaySetuTransactions'
import GetSelectedTransactions from '../context/GetSelectedTransactions'
import { CreateExpenseInBackendFromAPI } from '../api_call/CreateExpenseInBackendFromAPI'
import BackendCategories from '../data/BackendCategories'

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

const get_consent_status = (consentID) => {
    let url_status_promise = get_promise('/api/setu/check_consent/', consentID)
    
    let consent_status = url_status_promise.then(res => {
        console.log('In promise: Response Status: ', res.data)
        //consent_status = res.data
        console.log('In promise Consent Status: ', consent_status)
        return res.data
        }).catch(err => {
            consent_status = err
            return err
        })
    console.log("Consent status in function outside main: ", consent_status, "type: ", typeof consent_status)
    return consent_status
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

const get_local_storage_item = (item_name) => {
    return window.localStorage.getItem(item_name)
}

function SetuTransactions() {
    const [consentID, setConsentID] = useState('')
    const [userMobileNo, setUserMobileNo] = useState('')
    const [consentStatus, setConsentStatus] = useState('') //used to be Not Requested
    const [dataSessionID, setDataSessionID] = useState('') 
    const [transactionData, setTransactionData] = useState([{}, {}])
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [expensesButton, setExpensesButton] = useState(false)
    const [backendCategories, setBackendCategories] = useState([])
    const currentTransactions = useContext(GetSelectedTransactions)
   
    //Temporary for Display
    useEffect(() => {
        window.localStorage.setItem('consentStatus', "ACTIVE")
    }, [])
    useEffect(() => {
        BackendCategories(setBackendCategories); //unmounted categories
        console.log("SetuTransactions: backendCategories: ", backendCategories)
        if (typeof window !== undefined) {
            //State updates asynchronously, no difference, just good to have
            if (get_local_storage_item("consentStatus") == "ACTIVE") {
                setConsentStatus("ACTIVE")
            }
            else if (!check_null_or_empty(window.localStorage.getItem('consentID'))) {
                console.log("In Storage ConsentID Present:", window.localStorage.getItem('consentID'))
                let consent_id_from_storage = window.localStorage.getItem('consentID')
                setConsentID(consent_id_from_storage)
                console.log("After getting from storage CID: ", consentID) 
                let consent_status_promise = get_consent_status(consent_id_from_storage)
                consent_status_promise.then(res => { 
                    console.log("Consent Status: ", res)
                    setConsentStatus(res)
                    console.log("Consent Status: ", consentStatus)
                }).catch(err => {})
            }
            else {
                console.log("Please request consent") 
                alert("Please request consent")
            }
        }
    }, []);

    useEffect(() => {
        console.log("Fetch Consent updated: ", consentStatus)
    }, [consentStatus])

    const addExpenses = async () => {
        console.log('Add Expenses: ', currentTransactions.selectedTransactions)
        console.log(CreateExpenseInBackendFromAPI) //Await
        currentTransactions.selectedTransactions.forEach(selected_transaction => {
            console.log("Each Selected Transaction: ", selected_transaction)
            console.log("Categories: ", backendCategories)
            CreateExpenseInBackendFromAPI(selected_transaction[0], 
                selected_transaction[1], backendCategories, selected_transaction[2])
        })
        //Send Expenses to Backend
    }
    return (
        <>
        {/*below should be global variable of local storage*/}
        {(consentStatus !== 'ACTIVE')? (
        <Card>
            <h>Please Activate / Request Consent</h>
        </Card> ) : (
            <>
            <Table> 
                <TableHead >
                    <TableRow >
                        <StyledTableCell align="center">
                        Amount
                        </StyledTableCell>
                        <StyledTableCell align="center">Transaction Date</StyledTableCell>
                        <StyledTableCell align="center">Description</StyledTableCell>
                        <StyledTableCell align="center">Type</StyledTableCell>
                        <StyledTableCell align="center">Category</StyledTableCell>
                        <StyledTableCell align="center">Selected</StyledTableCell>
                    </TableRow>
                </TableHead>
               
                <TableBody>
                    {setu_transaction_data.setu_transaction_data.map((transaction, indx) => (
                        <>
                            <DisplaySetuTransactions key = {indx} transaction = {transaction}/>
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
