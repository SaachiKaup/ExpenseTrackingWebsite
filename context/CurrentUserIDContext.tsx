import * as React from 'react'
const CurrentUserIDContext = React.createContext ({
    currentUserID: 16,
    setCurrentUserID: () => {}
})
export default CurrentUserIDContext