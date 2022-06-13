import Auth0Login from './Auth0Login'
import MainMenu from './MainMenu'

export default function Home() {
  return (
    <>
      <Auth0Login />
      <br></br>
      <a href = 'api/auth/logout'>Log Out</a>
    </>
  )
}
