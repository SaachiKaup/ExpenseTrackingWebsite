import '../styles/globals.css'
import { UserProvider } from '@auth0/nextjs-auth0'
//import App from './App' :Not required

function MyApp({ Component, pageProps }) {
  return (
  <UserProvider>
    <Component {...pageProps} />
  </UserProvider>  
  )
}

export default MyApp
