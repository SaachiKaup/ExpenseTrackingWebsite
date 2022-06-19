import Auth0Login from './Auth0Login'
// import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0'
import Menu from './MainMenu.js'

export default function Home() {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (user) {
    return (
      <>
        <Menu />
        {/* <Link href = '/api/auth/logout'>Log Out</Link> */}
      </>
    )
  }
  else {
    return (
      <>
        <Auth0Login /> 
      </>
    )
  }
}
