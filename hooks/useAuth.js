import React, {useState, useEffect} from 'react';
import {getSession, signIn} from 'next-auth/react'
import { useRouter } from 'next/router';

function useAuth(comp) {
	const router = useRouter()
	const [loading, setloading] = useState(true);
	useEffect(() => {
	  const securePage = async () => {
	    const session = await getSession()
	    console.log("logging from hook",session)
	    if(!session){
	      signIn()
	    } else if(!session.user.name) {
		router.push("/userprofile")
		setloading(false)
	    }else{
	      setloading(false)
	    }
	  }
	 securePage()
	  
	}, []);
	return loading ? <h1>loading</h1> : comp
	
	
}

export default useAuth;
