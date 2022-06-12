import * as React from 'react'
const CurrentUserIDContext = React.createContext ({
    currentUserID: 4, //should update according to login
    setCurrentUserID: () => {}
})
export default CurrentUserIDContext