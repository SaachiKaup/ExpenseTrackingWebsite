import React, { useEffect, useState, useContext} from 'react'
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
import GetSelectedTransactions from '../context/GetSelectedTransactions'
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

     
    /*const loadDataOnlyOnce = useCallback(
      () => {
        console.log("I need a mobile Number: ", userMobileNo)
      },
      [userMobileNo]
    )*/

    useEffect(async () => {
        console.log("Main Component transaction data: ", currentTransactions.selectedTransactions)
        BackendCategories(setBackendCategories)
        console.log("BackendCategories: ", backendCategories)
        if (typeof window !== 'undefined') {

            if (check_null_or_empty(userMobileNo) && !check_null_or_empty(window.localStorage.getItem('userMobileNo'))) {
                console.log("Mobile Present")
                setUserMobileNo(window.localStorage.getItem('userMobileNo'))
            }
            if (check_null_or_empty(consentID) && !check_null_or_empty(window.sessionStorage.getItem('consentID'))) {
                console.log("In Storage ConsentID Present:", window.sessionStorage.getItem('consentID'))
                setConsentID(window.sessionStorage.getItem('consentID'))
                console.log("After getting from storage CID: ", consentID)
                
            }
            //Do the same for Data Session
            //This occurs if consent id is blank even in storage
            //Send Consent Request Here

            if(!check_null_or_empty(userMobileNo) && check_null_or_empty(consentID)) {
                console.log("Mobile present, no consent ID")
                const consent_id = await get_consent_function(userMobileNo)
                //setConsentID(consent_id)
                //setFetchedConsent('')
                window.sessionStorage.setItem('consentID', consent_id)
                window.sessionStorage.setItem('fetchedConsent', '')
                window.location.assign('https://fiu-uat.setu.co/consents/webview/' + consent_id)
                console.log('c_id After: ', consent_id)
            }
            if (!(check_null_or_empty(userMobileNo)) && !check_null_or_empty(consentID)) { 
                console.log("Both Consent And Mobile No present")
                /*const consent_id = window.sessionStorage.getItem('consentID')
                setConsentID(consent_id)  
                console.log("Consent _id after getting from storage: ", consent_id)
                console.log("Consent ID after getting from storage: ", consentID)*/
                /*if (!check_null_or_empty(consent_id)) {
                    console.log('Consent is Not Empty: ', consent_id)
                    let consent_status = ''
                    await get_consent_status(consent_id, consent_status)
                    
                        if (typeof consent_status !== Object) {
                            setFetchedConsent(consent_status)
                            console.log('Consent Status in State: ', fetchedConsent)
                        }
                }
                else {
                    console.log("Mobile:", userMobileNo)
                    let consent_id = await get_consent_function(userMobileNo)
                    console.log('Consent ID in ELse: ', consent_id)
                }*/
            }
            if(!check_null_or_empty(consentID) && fetchedConsent !== 'ACTIVE') {
                console.log('Consent Present, Not Active')
                let consent_status_promise = new Promise(async (resolve, reject) => {
                    let consent_status_from_api = await axios('/api/setu/check_consent/' + consentID)
                    return resolve(consent_status_from_api)
                })
                consent_status_promise.then(res => {
                    let consent_status_in_useEffect = res.data
                    console.log('In useEffect Consent Status: ', consent_status_in_useEffect)
                    if (consent_status_in_useEffect == 'ACTIVE') {
                        console.log("Consent IS:", consent_status_in_useEffect, "of type: ", typeof consent_status_in_useEffect)
                        setFetchedConsent(consent_status_in_useEffect)
                        console.log('Fetched Consent After Activating: '. fetchedConsent)
                    }
                    else {
                        console.log("not Active Consent Status: ", consent_status_in_useEffect)
                    }
                }).catch(err => 
                    console.log("Status Err: ", err))
            }
            if (check_null_or_empty(dataSessionID)) {
                setDataSessionID(window.sessionStorage.getItem('dataSessionID'))
            }
            if (fetchedConsent === 'ACTIVE' && check_null_or_empty(dataSessionID)) {
                console.log('Active consent, data session not started')
                const data_session_id = await start_data_session(consentID)
                console.log('Data Session ID: ', data_session_id)
                setDataSessionID(data_session_id)
                console.log('Data Session ID: ', dataSessionID)
                console.log('Data Session ID from storage: ', window.sessionStorage.getItem('dataSessionID'))
            }
            if(!check_null_or_empty(dataSessionID)) {
                console.log("Data Session ID PResent", dataSessionID)
                //let transaction_data = await get_transaction_data(dataSessionID)
                //let transaction_data = JSON.stringify(transaction_data_array) //JSON Error over here
                console.log('Transaction only data in function: ', setu_transaction_data)
                setTransactionData(setu_transaction_data)
                //console.log('Transaction data in state: ', transactionData)
                //setTransactionDataWithStorage(transaction_data)
            }
        
            /*console.log('In uE consentID: ', consentID)
            console.log('IN uE userMobileNo: ', userMobileNo)
            console.log('In uE datasessionID in useEffect: ', userMobileNo)*/
            
        }
    }, [dataSessionID, fetchedConsent]) 

    //console.log("outside uE Consent ID: ", typeof consentID, consentID)
    //console.log("outside uE Data Session ID: ", dataSessionID)    
    //console.log("outside uE Mobile No: ", userMobileNo)
    //console.log('outside uE Consent: ', fetchedConsent)

    /*function setTransactionDataWithStorage(transaction_data) {
        window.sessionStorage.setItem('transactionData', transaction_data)

    }*/
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
        {(fetchedConsent !== 'ACTIVE')? (
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
//Alt Use Effect that only works till data session ID

    /*useEffect(async () => {
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
                        let url_data_session_promise = get_promise('/api/setu/data_session_start/', consent_id_from_storage)
                        url_data_session_promise.then(data_session_res => {
                            console.log('Data Session ID: ', data_session_res.data)
                            setDataSessionID(data_session_res.data)
                            if (data_session_res.data != 'No Data Session') {
                                let url_data_promise = get_promise('/api/setu/get_data/', data_session_res.data)
                                url_data_promise.then(transaction_res => {
                                    console.log('Data: ', transaction_res.data)
                                    setTransactionData(transaction_res.data)
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
    }, []) */

//old useEffect(2 times) code

    /*useEffect(async () => {

        //console.log('In useEffect')
        if(!check_null_or_empty(userMobileNo) && check_null_or_empty(consentID)) {
            console.log('User Mobile No', userMobileNo)
            const consent_id = await get_consent_function(userMobileNo)
            setConsentID(consent_id)
            setFetchedConsent('')
            if (typeof window !== undefined) {
                console.log("Window is not undefined when required")
                window.sessionStorage.setItem('consentID', consent_id)
                window.sessionStorage.setItem('fetchedConsent', '')
                window.location.assign('https://fiu-uat.setu.co/consents/webview/' + consent_id)
            }
            
            console.log('Consent ID After: ', consentID)
        }
        if(!check_null_or_empty(consentID) && fetchedConsent !== 'ACTIVE') {
            console.log('Consent IS not null or empty')
            const consent_status = await get_consent_status(consentID)
            console.log('Consent Status: ', consent_status)
            if (consent_status == 'ACTIVE') {
            setFetchedConsent(consent_status)}
            
        }
        if (fetchedConsent === 'ACTIVE' && check_null_or_empty(dataSessionID)) {
            console.log('Active consent, data session not started')
            const data_session_id = await start_data_session(consentID)
            console.log('Data Session ID: ', data_session_id)
            setDataSessionID(data_session_id)
            console.log('Data Session ID: ', dataSessionID)
            console.log('Data Session ID from storage: ', window.sessionStorage.getItem('dataSessionID'))
        }
        if(!check_null_or_empty(dataSessionID)) {
            console.log('Need to rehandle later \n Data session id present')
            console.log('Current Data session ID:', dataSessionID)
            let transaction_data_array = await get_transaction_data(dataSessionID)
            let transaction_data = JSON.stringify(transaction_data_array) //JSON Error over here
            console.log('Transaction only data in function: ', transaction_data)
            setTransactionData(transaction_data)
            console.log('Transaction data in state: ', transactionData)
            setTransactionDataWithStorage(transaction_data)
        }
    }, []) */

/* All the functional code , that could not be used
const setConsentIdWithSessionStorage = (consent_id) => {
        setConsentID(consent_id)
        console.log('Consent ID After setting: ', consentID)
        if (typeof window !== undefined) {
            window.sessionStorage.setItem('consentID', consentID)
            console.log('Window storage: ', window.sessionStorage.getItem('consentID'))
        }
        else {
            console.log('window undefined dumbass')
        }
    }
    
    const setConsentStatusWithSessionStorage = (fetched_consent) => {
        setFetchedConsent(fetched_consent)
        window.sessionStorage.setItem('fetchedConsent', fetchedConsent)
    }

    const setDataSessionIdWithSessionStorage = (data_session_id) => {
        setDataSessionID(data_session_id)
        window.sessionStorage.setItem('dataSessionID', dataSessionID)
    } */

/* old imports
import GetConsentDetails from './src/data/GetConsentDetails'
import setuIDs from './src/IDs/setu'
import { useRouter } from 'next/router'
import { Link } from 'next/link' */
//Old Code for Data session with promises

            /*const data_session_promise = new Promise(async (resolve, reject) => {
                let session_data = await axios('/api/setu/data_session_start/' + consentID)
                return resolve(session_data)
            })

            data_session_promise.then(async (res) => {
                let data_session_id = res.data
                console.log('Data Session id:', typeof data_session_id)*/
                /*NW: setDataSessionID(res.data)
                console.log('State data session id:', dataSessionID)*/
                /*const get_data_promise = new Promise (async (resolve, reject) => {
                    let payload_data = await axios('/api/setu/get_data/' + data_session_id)
                    //not displaying console.log('Payload Data in promise: ', payload_data)
                    return resolve(payload_data)
                    })
                get_data_promise.then(async(res) => {
                    console.log('Promise:', get_data_promise)})*/
                    /*get_data_promise.then(res => {
                        console.log('Consent Status: ', res.data)
                    })
                    }).catch(err => {
                        console.error(err)
                    })*/
                /*NWsetDataSessionID(data_session_id)
                console.log('State data session id:', dataSessionID)*/
            /*}, err => {
                console.err('Error Message from session data')
            })*/

/* old code in use effect, right after all the states are declared
//const [submitted, setSubmitted] = useState(false)
    /*useEffect(async () => {
        if (typeof window !== undefined && submitted) {
            console.log("in browser")
            let url = await axios('/api/setu/consent/9619190931') //+ setuIDs.mobile_no)
            console.log('URL in useEffect', url)
            setFetchedRedirectURL(url.data)
            setFetchedConsentID(url.data.consentId)
            window.location.assign(url.data)
            
        }
    }, []) */
    //const [submitted, setSubmitted] = useState(false)
    /*useEffect(async () => {
        if (typeof window !== undefined && submitted) {
            console.log("in browser")
            let url = await axios('/api/setu/consent/9619190931') //+ setuIDs.mobile_no)
            console.log('URL in useEffect', url)
            setFetchedRedirectURL(url.data)
            setFetchedConsentID(url.data.consentId)
            window.location.assign(url.data)
            
        }
    }, []) 
    

*/

/*
Code to call setu APi

    const [fetchedRedirectURL, setRedirectURL] = useState("")
    var axios = require('axios');
    var data = JSON.stringify({
    "Detail": {
        "consentStart": new Date().toISOString(),
        "consentExpiry": "2022-05-10T05:44:53.822Z",
        "Customer": {
        "id":  "9619190931@onemoney" //use user input here
        },
        "FIDataRange": {
        "from": "2021-04-01T00:00:00Z",
        "to": "2021-10-01T00:00:00Z"
        },
        "consentMode": "STORE",
        "consentTypes": [
        "TRANSACTIONS",
        "PROFILE",
        "SUMMARY"
        ],
        "fetchType": "PERIODIC",
        "Frequency": {
        "value": 30,
        "unit": "MONTH"
        },
        "DataFilter": [
        {
            "type": "TRANSACTIONAMOUNT",
            "value": "5000",
            "operator": ">="
        }
        ],
        "DataLife": {
        "value": 1,
        "unit": "MONTH"
        },
        "DataConsumer": {
        "id": "setu-fiu-id"
        },
        "Purpose": {
        "Category": {
            "type": "string"
        },
        "code": "101",
        "text": "Loan underwriting",
        "refUri": "https://api.rebit.org.in/aa/purpose/101.xml"
        },
        "fiTypes": [
        "DEPOSIT"
        ]
    },
    "redirectUrl": "https://setu.co"
    });

    var config = {
        method: 'post',
        url: 'https://fiu-uat.setu.co/consents',
        headers: { 
            'x-client-id': 'd6d5aca0-8b79-46de-8ac2-0f572be84273', 
            'x-client-secret': 'b45f3b49-06de-42f5-a816-3e137427c406', 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "https://fiu-uat.setu.co"
        },
        data : data
    };
    //Axios not working inside useEffect
    //console.log('Out side useEfect anumati_url: ', anumati_url);//pending promise
    var backupRedirectURL = "";
    /*axios(config)
        .then(function (response) {
            console.log('Response: ', JSON.stringify(response.data));
            //anumati_url = response.data.url
            //console.log('Response url from axios: ', reponse.data.url)
            backupRedirectURL = response.data.url;
            setRedirectURL(response.data.url)
        
            console.log('Redirect URL in axios: ', fetchedRedirectURL)
            
        })
        .catch(function (error) {
            console.log("Error message: ", error);
        }) 
        .then(function () {
            setRedirectURL(backupRedirectURL)
            console.log('final Redirect URL: ', fetchedRedirectURL)
        }); *
            

//useEffect in another function

    useEffect(() => {
        //console.log('inside second useffect anumati_url: ', anumati_url);
        console.log('Config from useEffect: ', config)
        /* axios.post(config)
        .then(res => {
            
        }) *
        
        if (typeof window !== 'undefined') {
            console.log('We are in the browser')
            console.log('location:', window.location.href)
            /*axios("http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=json")
            .then(function (response) {
                console.log(response.data);
            })* 
            console.log('Config: ', config)
            //console.log('Redirect URL: ', redirectURL)
        }
    }, [])

//old function to get details

    function get_request_details(client_id, client_secret, details) {
    return {
        method: "post",
        url: "https://fiu-uat.set.co/consents",
        headers: {
            "Content-Type": "application/json",
            "x-client-id": client_id,
            "x-client-secret": client_secret,
        },
        data: details
    }
}
    old Code in main function:
    var details_string = GetConsentDetails({
        "mobile_no": "9888888888"
    })
    var details_body = JSON.parse(details_string)
    //console.log(details)
    const [client_id, client_secret] = setuIDs
    //console.log(setuIDs)
    var axios_request = get_request_details(client_id, client_secret, details_string)
    //console.log(typeof JSON.stringify(axios_request))

    /*NW: axios(axios_request)
    .then(res => 
        console.log('Response: ', res)
        )
    .catch(error => {
        console.log(error);
    });*/ 

/* 
client side rendering: import Router from 'next/router'
*/