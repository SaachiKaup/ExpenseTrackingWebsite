export default async function(req, res) {
    var axios = require('axios')
    
    var body = {
        "consentId": req.query.consent_id,
        "DataRange": {
            "from": "2021-05-01T00:00:00Z",
            "to": "2021-10-01T00:00:00Z"
        },
         "format": "json"
    }
    var config = {
        method: 'post',
        url: 'https://fiu-uat.setu.co/sessions',
        headers: { 
            'x-client-id': 'd6d5aca0-8b79-46de-8ac2-0f572be84273', 
            'x-client-secret': 'b45f3b49-06de-42f5-a816-3e137427c406', 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "https://fiu-uat.setu.co"
        },
        data: JSON.stringify(body)
    };
    try {
    axios(config)
        .then(function (response) {
            return res.send(response.data.id)
        })
        .catch(function (error) {
            return res.status(500).json({ error: error.message });
        }) 
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
}