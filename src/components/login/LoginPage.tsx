import './LoginPage.css'
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import * as Cookies from "js-cookie";
import TokenResponse from "../../interfaces/response/TokenResponse.ts";
import {UserContext} from "../../context/UserContext.ts";
import UserWithProfileResponse from "../../interfaces/response/UserWithProfileResponse.ts";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState<{status: string, type: "SUCCESS" | "FAILURE"}>({
        status: ' ',
        type: "FAILURE"
    });

    const navigate = useNavigate();

    const { setUser } = useContext(UserContext);

    async function handleSubmission(){
        let resp = await fetch(import.meta.env.VITE_API_URL+"users/login", {
            method: 'POST',
            body: JSON.stringify({"username": username, "password": password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(!resp.ok){
            setLoginStatus({status: "Failed to authenticate. Invalid Credentials", type: "FAILURE"});
        }
        else{
            const token = await resp.json() as TokenResponse;
            Cookies.default.set("token", token.token);

            // fetch user details for context
            resp = await fetch(import.meta.env.VITE_API_URL+"users/self",
                {
                    headers: {
                        "Authorization": "Bearer " + Cookies.default.get("token")
                    }
                });

            if(resp.ok){
                const userInfo = (await resp.json()) as UserWithProfileResponse;
                setUser(userInfo);
            }

            setLoginStatus({status: "Redirecting...", type: "SUCCESS"});
            setTimeout(() => {
                navigate("/");
            }, 1000)
        }
    }

    return (<div id="login-page-container">
        <div id="login-panel-container">
            <b id="login-title-text">SIGN IN</b>

            <p id={loginStatus.type === "SUCCESS" ? "login-status-text-success": "login-status-text-error"}>{loginStatus.status}</p>

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