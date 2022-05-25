
export default function GetConsentDetails(props) {
    //console.log('Mobile: ', props.mobile_no)
    var details = {
        "Detail": {
            "consentStart": new Date().toISOString(),
            "consentExpiry": "2022-04-30T05:44:53.822Z",
            "Customer": {
                "id": props.mobile_no + "@onemoney"   
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
    return JSON.stringify(details)
}
