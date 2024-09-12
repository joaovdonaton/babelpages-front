import './RegisterPage.css'
import './LoginPage.css'
import {Link} from "react-router-dom";
import {useState} from "react";
import RegisterFormData from "../../interfaces/RegisterFormData.ts";
import useFetchPost from "../../hooks/useFetchPost.ts";
import UserBasicResponse from "../../interfaces/response/UserBasicResponse.ts";
import {BABEL_URL} from "../../util/constants.ts";

/*
* TODO: make nice little thing on success
* TODO: error for username already exists (maybe change backend)
* */

const RegisterPage = () => {
    const [formData, setFormData] = useState<RegisterFormData>({
        username: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: ''
    })
    const [registerStatus, setRegisterStatus] = useState<string>(' ');

    const { doPost, responseBody} = useFetchPost<UserBasicResponse, RegisterFormData>(BABEL_URL + 'users/')

    function handleSubmit(){
        if(formData.password !== formData.confirmPassword){
            setRegisterStatus('Passwords don\'t match');
            return;
        }

        // validate form (as per backend specification, see https://github.com/joaovdonaton/babel-pages-bookstore/blob/master/src/main/java/edu/kent/babelpages/rest/users/DTO/UserCreationDTO.java)
        if(formData.username.length < 6 || formData.username.length > 30){
            setRegisterStatus('Username should be between 6 and 30 characters');
            return;
        }

        if(formData.firstName.length < 2 || formData.firstName.length > 30){
            setRegisterStatus('First name should be between 2 and 30 characters');
            return;
        }

        if(formData.lastName.length < 2 || formData.lastName.length > 30){
            setRegisterStatus('Last name should be between 2 and 30 characters');
            return;
        }

        if(formData.password.length < 8 || formData.password.length > 128){
            setRegisterStatus('Password should be between 8 and 128 characters');
            return;
        }

        doPost(formData)
    }

    return (<div id="login-page-container">
        <div id="login-panel-container">
            <b id="login-title-text">REGISTER</b>

            {registerStatus && <p id="login-status-text">{registerStatus}</p>}

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