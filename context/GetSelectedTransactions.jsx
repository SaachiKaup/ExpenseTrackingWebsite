import * as React from 'react'
const GetSelectedTransactions = React.createContext ({
    selectedTransactions: [],
    setSelectedTransactions: () => []
})
export default GetSelectedTransactions