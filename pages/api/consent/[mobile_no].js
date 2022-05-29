import { NextApiRequest, NextApiResponse } from "next";

export default async function get_consent_from_api(req, res) {
    const mobile_no = req.query.mobile_no;
    var axios = require('axios');

    var data = JSON.stringify({
        "Detail": {
            "consentStart": new Date().toISOString(),
            "consentExpiry": "2022-12-31T05:44:53.822Z",
            "Customer": {
            "id": mobile_no + "@onemoney" //use user input here
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
        "redirectUrl": "https://expense-tracking-website-git-master-saachikaup.vercel.app/TransactionsPage" //Should be page that shows transactions
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
    try {
    axios(config)
        .then(function (response) {
            return res.send(response.data.url)
        })
        .catch(function (error) {
            return res.status(500).json({ error: error.message });
        }) 
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
}

/*old code

import axios from 'axios';
export default async function (req, res) {
    //const mobile_no = req.query
    //console.log('Mobile Num: ', mobile_no)
    const mobile_no = req.query.mobile_no
    var body = {
        "Detail": {
            "consentStart": new Date().toISOString(),
            "consentExpiry": "2022-04-30T05:44:53.822Z",
            "Customer": {
                "id": mobile_no + "@onemoney"   
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
    }
    //res.send(mobile_no)
    const client_id = "d6d5aca0-8b79-46de-8ac2-0f572be84273"
    const client_secret = "b45f3b49-06de-42f5-a816-3e137427c406"
    let request_details = {
        url: "https://fiu-uat.set.co" + "/consents",
        headers: {
        "Content-Type": "application/json",
        "x-client-id": client_id,
        "x-client-secret": client_secret,
        },
    };
     
    axios.post(request_details, req)
        .then(function (response) {
            let retrived_url = response.data.url;
            console.log(response)
            res.send(response);
        })
        .catch(function (error) {
            console.log(error);
            console.log("Error");
        });
} */