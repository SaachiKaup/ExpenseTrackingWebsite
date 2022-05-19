import React from 'react'

function Users() {
    const [users, setUsers] = React.useState([]);
    fetch("/api/users").then((res) =>
            res.json()).then(users => {
                setUsers(users)
            });
    return (
      <div>
        
        <ul>
          {users.map(user => (
            <li key={user.user_id}>{user.first_name}</li>
          ))}
        </ul>
       
      </div>
    )
}

export default Users

/* Methods that did not work    

useQuery, client provider:
import {useQuery,  QueryClientProvider, useMutation, QueryClient} from "react-query"
import GetUserData from './UserData'

wrong async await: Returns promises
  const fetch_user_data = async () => {
    const user_data = await fetch('/api/users').then(function(response) {
      return response.json();
      console.log(response.json())
  })

  console.log('user in helper func', user_data)
  return user_data
}
    const { user_data: users } = useQuery("users" , fetch_request)
    const user = useQuery("users", fetch_request)
    const user_data = useQuery("user_data", fetch_user_data) */