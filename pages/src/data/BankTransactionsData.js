import React from 'react'
import NextCors from 'nextjs-cors';
import { NextApiRequest, NextApiResponse } from "next"

async function getPlaidTransactionData() {
    const axios = require('axios');
    var bankTransactions= [];
    var plaid_access_token = 'access-sandbox-65743c5d-092d-4545-96d9-1ce38cbe2561';
    var plaid_client_id = '621dbdb825a56f0013ae709b';
    var plaid_secret = '0cfea05bcfdd57515ccaf0bfadf2cf';
    var plaid_public_key = 'public-sandbox-32ae2779-a22f-4109-9183-a33a34dfc4d7';
    var plaid_env_url = 'sandbox.plaid.com';
    var plaid_link_token = 'link-sandbox-f938c2e6-e554-4d74-a4a6-c52b94eca544'
    var plaid_url = 'https://sandbox.plaid.com/transactions/get';
    var plaid_headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'charset': 'utf-8',
        'Access-Control-Allow-Origin': 'https://sandbox.plaid.com',
    };
    var plaid_body = {
        'client_id': plaid_client_id,
        'secret': plaid_secret,
        'access_token': plaid_access_token,
        'public_token': plaid_link_token,
        'public_key': plaid_public_key,
        'start_date': '2019-01-01',
        'end_date': '2019-12-31',
        'count': 100,
        'offset': 0,
    };
    /*await NextCors(req, res, {
      // Options
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
      credentials: true
    });*/
    axios.post(plaid_url, plaid_body, plaid_headers).then(
        res => {
            res.data.transactions.forEach(transaction => {
                console.log('plaid transaction', transaction)
                bankTransactions.push(transaction)

            });
            console.log('All transactions: ', bankTransactions)
            return bankTransactions || null
        }).catch(err => {
            console.error(err);
        })
    console.log('plaid transactions', bankTransactions)
    return bankTransactions || null
}

function BankTransactionsData() {
    const [bankTransactions, setBankTransactions] = React.useState([]);
    React.useEffect(() => {
        getPlaidTransactionData().then(bankTransactions => {
            setBankTransactions(bankTransactions)
        })
    }, [])

  return (
    <div>BankTransactionsData</div>
  )
}

export default BankTransactionsData