import Auth0Login from './Auth0Login'
// import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0'
import Menu from './MainMenu.js'
import Card from './src/shared/Card';

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading) 
    return (
      <Card>
        <div>Loading...</div>
      </Card>
    );

  if (error) 
    return (
      <Card>
        <div>{error.message}</div>
      </Card>
    );
    
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
