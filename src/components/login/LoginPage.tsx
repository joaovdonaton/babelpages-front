import './LoginPage.css'
import {Link} from "react-router-dom";
import {useState} from "react";
import * as Cookies from "js-cookie";
import TokenResponse from "../../interfaces/TokenResponse.ts";

/*
* TODO: login page message after success
*
* TODO: make global state or something in order to have page reload and automatically get authenticated user in navbar
* */

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState<string|undefined>();

    async function handleSubmission(){
        const resp = await fetch(import.meta.env.VITE_API_URL+"users/login", {
            method: 'POST',
            body: JSON.stringify({"username": username, "password": password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(!resp.ok){
            setLoginStatus("Failed to authenticate. Invalid Credentials");
        }
        else{
            const token = await resp.json() as TokenResponse;
            Cookies.default.set("token", token.token);
        }
    }

    return (<div id="login-page-container">
        <div id="login-panel-container">
            <b id="login-title-text">SIGN IN</b>

            {loginStatus && <p id="login-status-text">{loginStatus}</p>}

            <p className="login-label-text">Username</p>
            <input className="login-input" type="text" value={username}
                   onChange={(e) => setUsername(e.target.value)}/>
            <p className="login-label-text">Password</p>
            <input className="login-input" type="password" value={password}
                   onChange={(e) => setPassword(e.target.value)}/>
            <input className="login-submit-button" type="button" value="Login" onClick={handleSubmission} />

            Don't have an account? <Link to="/register" className="remove-a-style register-link">Click here to
            register!</Link>
        </div>
    </div>)
};

export default LoginPage;