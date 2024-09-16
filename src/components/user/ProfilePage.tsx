import './ProfilePage.css'
import '../login/LoginPage.css'
import {useParams} from "react-router-dom";
import useFetch from "../../hooks/useFetch.ts";
import UserWithProfileResponse from "../../interfaces/response/UserWithProfileResponse.ts";
import {BABEL_URL, countryCodeToName} from "../../util/constants.ts";
import {useEffect} from "react";
import loadingGif from '../../assets/images/gifs/loading.gif';
import userIcon from '../../assets/images/icons/user-icon.png'
import unkownFlag from '../../assets/images/replacements/unkown-flag.png'

/*
* TODO: implement user page from figma
* TODO: if user is currently authenticated (aka on self page), add options to change pfp, bio or whatever
* TODO: add display to show if user is new
* TODO: show user's recent reviews
* */

const ProfilePage = () => {
    const { username } = useParams();
    const { data: userData, isLoading, statusCode } = useFetch<UserWithProfileResponse>(
        BABEL_URL+"users/"+username
    );

    useEffect(() => {
        if(statusCode === 404){
            throw new Response("User with username " + username + " not found", {status: 404});
        }
    }, [statusCode]);

    return (<div id="login-page-container">
        <div id="profile-page-panel">
            {isLoading ?
                <img src={loadingGif} alt="loading gif"/>
                :
                <>
                    <div id="profile-page-upper">
                        <img id="profile-img" src={userData!.profile.profilePictureUrl || userIcon} alt="profile picture"/>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <div>
                                <h1 style={{fontSize: "2.5rem", display: "inline-block"}}>{userData!.username}</h1>
                                <p style={{display: "inline-block", marginLeft: "0.4rem"}}>{userData!.profile.occupation}</p>
                            </div>
                            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <img id="profile-page-flag"
                                    src={ userData!.profile.country ?
                                    `https://purecatamphetamine.github.io/country-flag-icons/3x2/${userData!.profile.country}.svg`
                                        :
                                        unkownFlag
                                }
                                alt="country flag"/>
                                <p>{userData!.profile.country ? countryCodeToName[userData!.profile.country] : "Unkown Location"}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2>Bio</h2>
                        <p style={{color: "#575555"}}>{userData!.profile.bio}</p>
                    </div>
                </>
            }
        </div>
    </div>)
};

export default ProfilePage;