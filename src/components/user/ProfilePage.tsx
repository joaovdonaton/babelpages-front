import './ProfilePage.css'
import '../login/LoginPage.css'
import {Link, useParams} from "react-router-dom";
import useFetch from "../../hooks/useFetch.ts";
import UserWithProfileResponse from "../../interfaces/response/UserWithProfileResponse.ts";
import {BABEL_URL, countryCodeToName} from "../../util/constants.ts";
import {useContext, useEffect, useMemo} from "react";
import loadingGif from '../../assets/images/gifs/loading.gif';
import userIcon from '../../assets/images/icons/user-icon.png'
import unkownFlag from '../../assets/images/replacements/unkown-flag.png'
import ReviewDetailsFullResponse from "../../interfaces/response/ReviewDetailsFullResponse.ts";
import ReviewSummary from "./ReviewSummary.tsx";
import {UserContext} from "../../context/UserContext.ts";
import {generateImageURL} from "../../util/util.ts";

const ProfilePage = () => {
    const { username } = useParams();
    const { data: userData, isLoading: userIsLoading, statusCode: userStatusCode }
        = useFetch<UserWithProfileResponse>(
        BABEL_URL+"users/"+username
    );

    const {user} = useContext(UserContext);

    // explained in MainPage.tsx
    const paramsForReviews = useMemo(() => ({'orderBy': 'DATE', 'filterByUsername': username!, 'limit': '3', 'page': '0', 'ascDesc': 'DESC'}), []);

    // username! in the query param is a temporary fix for when we access a username that is invalid
    const {data: reviewsData}
        = useFetch<ReviewDetailsFullResponse[]>(BABEL_URL + "reviews/?",
        {queryParams: paramsForReviews});

    useEffect(() => {
        if(userStatusCode === 404){
            throw new Response("User with username " + username + " not found", {status: 404});
        }
    }, [userStatusCode]);

    return (<div id="login-page-container">
        <div id="profile-page-panel">
            {userIsLoading ?
                <img src={loadingGif} alt="loading gif"/>
                :
                <>
                    <div id="profile-page-upper">
                        <img id="profile-img" src={generateImageURL(userData!.profile.profilePictureUrl) || userIcon}
                             alt="profile picture"/>
                        <div style={{display: "flex", flexDirection: "column", alignItems: "start"}}>
                            <div>
                                <h1 style={{fontSize: "2.5rem", display: "inline-block"}}>{userData!.username}</h1>
                                <p style={{
                                    display: "inline-block",
                                    marginLeft: "0.4rem"
                                }}>{userData!.profile.occupation}</p>
                            </div>
                            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <img id="profile-page-flag"
                                     src={userData!.profile.country ?
                                         `https://purecatamphetamine.github.io/country-flag-icons/3x2/${userData!.profile.country}.svg`
                                         :
                                         unkownFlag
                                     }
                                     alt="country flag"/>
                                <p>{userData!.profile.country ? countryCodeToName[userData!.profile.country] : "Unkown Location"}</p>
                            </div>
                        </div>
                        <div style={{marginLeft: "auto", display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <p id="profile-page-new-icon">
                                {userData!.createdAt > (Date.now() - 7 * 24 * 60 * 60 * 1000) /* AKA a week ago */ ? "New User" : "Member"}
                            </p>
                            {(username === user?.username) &&
                            <Link to={"./edit"} className="remove-a-style" id="profile-page-edit-icon">
                                Edit
                            </Link>
                            }
                        </div>
                    </div>
                    <div>
                        <h2>Bio</h2>
                        <p style={{color: "#575555"}}>{userData!.profile.bio}</p>
                    </div>
                    <div>
                        <h2>Recent Reviews</h2>
                        {reviewsData && reviewsData.map((r) => {
                            return <ReviewSummary key={r.id} reviewDetails={r}/>
                        })}
                    </div>
                </>
            }
        </div>
    </div>)
};

export default ProfilePage;