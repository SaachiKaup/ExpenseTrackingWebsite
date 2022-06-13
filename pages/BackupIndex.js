import MainMenu from './MainMenu'
import Login from './LoginReg/Login'
import { Auth0Provider } from '@auth0/auth0-react'

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENTID

export default function Home() {
  console.log("domain: ", domain)
  console.log("client: ", clientId)
  return (
    <Auth0Provider
      domain = {domain}
      clientId = {clientId}
      redirectUri = {window.location.origin}
      //redirectUri = {'http://localhost:3000'} //window.location.origin worked before
    >
      <Login />
    </Auth0Provider>
  )
}
