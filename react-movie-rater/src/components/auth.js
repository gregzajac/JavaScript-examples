import React, { useState, useEffect } from 'react';
import { API } from '../api-service';
import { useCookies } from 'react-cookie';


function Auth() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginView, setIsLoginView] = useState(true);

    const [token, setToken] = useCookies(['mr-token']);

    useEffect(() => {
        console.log(token);
        if(token['mr-token']) window.location.href = '/movies';
      }, [token])

    const loginClicked = () => {
        API.loginUser({username, password})
            .then(resp => setToken('mr-token', resp.token))
            .catch(error => console.log(error))
    }

    const registerClicked = () => {
        API.registerUser({username, password})
            .then(() => loginClicked())
            .catch(error => console.log(error))
    }

    return (
        <div>
            {isLoginView ? <h1>Login</h1> : <h1>Register</h1>} 

            <label htmlFor="username">Username</label><br/>
            <input id="username" type="text" placeholder="username" 
                value={username} 
                onChange={e => setUsername(e.target.value)}
            /><br/>
            <label htmlFor="password">Password</label><br/>
            <input id="password" type="password" placeholder="password"
                value={password} 
                onChange={e => setPassword(e.target.value)}
            /><br/>

            { isLoginView ? 
                <button onClick={loginClicked}>Login</button> :
                <button onClick={registerClicked}>Register</button>
            } 
            

            { isLoginView ? 
                <p onClick={() => setIsLoginView(false)}>
                    You don't have an account? Register here!
                </p> :
                <p onClick={() => setIsLoginView(true)}>
                    You already have an account? Login here!
                </p>
            }
        </div>
    )
}

export default Auth;