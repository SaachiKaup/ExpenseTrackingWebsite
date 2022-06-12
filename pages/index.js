import MainMenu from './MainMenu'
import { Auth0Provider } from '@auth0/auth0-react'

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENTID

export default function Home() {
  return (
    <Auth0Provider
      domain = {domain}
      clientId = {clientId}
      redirectUri = {'/'} //window.location.origin worked before
    >
      <MainMenu />
    </Auth0Provider>
  )
}
