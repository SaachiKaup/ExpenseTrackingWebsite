import * as React from 'react'
const CurrentUserIDContext = React.createContext ({
    currentUserID: 18, //should update according to login
    setCurrentUserID: () => {}
})
export default CurrentUserIDContext