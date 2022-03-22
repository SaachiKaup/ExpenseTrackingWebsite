/* Did not work
function show(user_data) {
    console.log(user_data)
    const root = document.getElementById('root')
    root.innerText = user_data[0]
    
}
function GetUserData() {
    
    fetch("/api/users").then((res) =>
            res.json()).then(user_data => {
                const users = user_data.map(user => user.first_name)
                
                console.log('users', users)
                show(users)
            });

    //console.log('users data ', users);
    return null
}
            
export default GetUserData;
*/
/*async function old_fetch_request() {
  const response = await fetch("/api/users");
  const data = await response.json();
  console.log('data', data);
  const [users] = data;
  console.log('users', users, typeof users);
  return users;
}*/
