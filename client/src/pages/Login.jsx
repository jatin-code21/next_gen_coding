import React, { useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from '../components/LogoutButton';
import axios from 'axios'

const Login = () => {
    const { loginWithRedirect} = useAuth0();
    const handleLogin = () => {
        loginWithRedirect();
    }
    return (
        <>
            <div>
                <button onClick={handleLogin}>Log In</button>
            </div>
            <div>
                <LogoutButton />
            </div>
        </>
    )
}

export default Login
