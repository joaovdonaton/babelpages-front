import './RegisterPage.css'
import './LoginPage.css'
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import RegisterFormData from "../../interfaces/RegisterFormData.ts";
import useFetchPost from "../../hooks/useFetchPost.ts";
import UserBasicResponse from "../../interfaces/response/UserBasicResponse.ts";
import {BABEL_URL} from "../../util/constants.ts";

const RegisterPage = () => {
    const [formData, setFormData] = useState<RegisterFormData>({
        username: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: ''
    })
    const [registerStatus, setRegisterStatus] = useState<{status: string, type: "SUCCESS" | "FAILURE"}>(
        {
            type: 'FAILURE',
            status: ' '
        }
    );

    const { doPost, statusCode} = useFetchPost<UserBasicResponse, RegisterFormData>(BABEL_URL + 'users/')
    const navigate = useNavigate();

    function handleSubmit(){
        if(formData.password !== formData.confirmPassword){
            setRegisterStatus({status: 'Passwords don\'t match', type: "FAILURE"});
            return;
        }

        // validate form (as per backend specification, see https://github.com/joaovdonaton/babel-pages-bookstore/blob/master/src/main/java/edu/kent/babelpages/rest/users/DTO/UserCreationDTO.java)
        if(!/^[a-zA-Z0-9]+$/.test(formData.username)){
            setRegisterStatus({status: 'Username field contains invalid characters', type: "FAILURE"});
            return;
        }

        if(!/^[a-zA-Z0-9 ]+$/.test(formData.firstName) || !/^[a-zA-Z0-9 ]+$/.test(formData.lastName)){
            setRegisterStatus({status: 'Name field contains invalid characters', type: "FAILURE"});
            return;
        }

        if(formData.username.length < 6 || formData.username.length > 30){
            setRegisterStatus({status: 'Username should be between 6 and 30 characters', type: "FAILURE"});
            return;
        }

        if(formData.firstName.length < 2 || formData.firstName.length > 30){
            setRegisterStatus({status: 'First name should be between 2 and 30 characters', type: "FAILURE"});
            return;
        }

        if(formData.lastName.length < 2 || formData.lastName.length > 30){
            setRegisterStatus({status: 'Last name should be between 2 and 30 characters', type: "FAILURE"})
            return;
        }

        if(formData.password.length < 8 || formData.password.length > 128){
            setRegisterStatus({status: 'Password should be between 8 and 128 characters', type: "FAILURE"})
            return;
        }

        doPost(formData)
    }

    useEffect(() => {
        if(statusCode === 409 /* conflict */) setRegisterStatus({status: "Username already exists", type: "FAILURE"});
        else if(statusCode === 201 /* created */) {
            setRegisterStatus({status: "Created! Redirecting to login..", type: "SUCCESS"});
            setTimeout(() => {
                navigate("/login");
            }, 2500)
        }
    }, [statusCode]);

    return (<div id="login-page-container">
        <div id="login-panel-container">
            <b id="login-title-text">REGISTER</b>

            <p id={registerStatus.type === "SUCCESS" ? "login-status-text-success" : "login-status-text-error"}>{registerStatus.status}</p>

            <p className="login-label-text">Username</p>
            <input className="login-input" type="text" value={formData.username}
                   onChange={(e) => setFormData({...formData, username: e.target.value})}/>
            <p className="login-label-text">First Name</p>
            <input className="login-input" type="text" value={formData.firstName}
                   onChange={(e) => setFormData({...formData, firstName: e.target.value})}/>
            <p className="login-label-text">Last Name</p>
            <input className="login-input" type="text" value={formData.lastName}
                   onChange={(e) => setFormData({...formData, lastName: e.target.value})}/>
            <p className="login-label-text">Password</p>
            <input className="login-input" type="password" value={formData.password}
                   onChange={(e) => setFormData({...formData, password: e.target.value})}/>
            <p className="login-label-text">Confirm Password</p>
            <input className="login-input" type="password" value={formData.confirmPassword}
                   onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}/>
            <input className="login-submit-button" type="button" value="Login" onClick={handleSubmit}/>

            Already have have an account? <Link to="/login" className="remove-a-style register-link">Click here to
            sign in!</Link>
        </div>
    </div>)
};

export default RegisterPage;