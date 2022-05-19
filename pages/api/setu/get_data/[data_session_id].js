export default async function(req, res) {
    var axios = require('axios')
    var config = {
        method: 'get',
        url: 'https://fiu-uat.setu.co/sessions/' + req.query.data_session_id,
        headers: {
            'x-client-id': 'd6d5aca0-8b79-46de-8ac2-0f572be84273',
            'x-client-secret': 'b45f3b49-06de-42f5-a816-3e137427c406',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "https://fiu-uat.setu.co"
        } 
    }
    try {
    axios(config)
        .then(function (response) {
            return res.send(response.data.Payload[0].data[0].decryptedFI.account.transactions.transaction) //acount info without status of data session
        })
        .catch(function (error) {
            return res.status(500).json({ error: error.message });
        }) 
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }    
}