import { getSession, signOut} from 'next-auth/react';
import { useRouter } from 'next/router';
import React, {useState} from 'react';
import useAuth from '../hooks/useAuth';

function dashboard() {
  const comp = (<div>
    <h1>dashboard</h1>
    <button onClick={(e) => signOut({ callbackUrl: 'http://localhost:3000/' })}>sign out</button>
  </div>)
  return useAuth(comp)
}

export default dashboard;
