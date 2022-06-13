import Auth0Login from './Auth0Login'
import MainMenu from './MainMenu'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Auth0Login />
      <br></br>
      <Link href = 'api/auth/logout'>Log Out</Link>
    </>
  )
}
