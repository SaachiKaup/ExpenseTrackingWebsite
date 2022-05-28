import * as React from 'react'
const SubmitButtonClicked = React.createContext ({
    clicks: 0,
    setClicks: () => {}
})
export default SubmitButtonClicked