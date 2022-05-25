import * as React from 'react'
const GetCurrentCategory = React.createContext ({
    category: 'Categories',
    setCategory: () => {}
})
export default GetCurrentCategory