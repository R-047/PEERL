import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { useEffect, useState } from 'react'
import {swRegistered} from '../contexts/UserTypeContext'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  const [sw, setsw] = useState(undefined)

  useEffect(() => {

    const registerServiceWorker = async () => {
      console.log("Registering service worker...");
      const register = await navigator.serviceWorker.register("/sw.js", {
        scope: "/"
      });
      setsw(register)
      console.log("Service Worker Registered...");
    }
    registerServiceWorker()
    
  }, [])
  
  return (
    <swRegistered.Provider value={sw}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </swRegistered.Provider>
  )
}