import './Review.css'

import userIcon from '../../assets/images/icons/user-icon.png'
import loadingGif from '../../assets/images/gifs/loading.gif'
import Stars from "../general/Stars.tsx";
import ReviewDetailsFullResponse from "../../interfaces/response/ReviewDetailsFullResponse.ts";
import useFetch from "../../hooks/useFetch.ts";
import UserWithProfileResponse from "../../interfaces/response/UserWithProfileResponse.ts";
import {BABEL_URL} from "../../util/constants.ts";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {generateImageURL} from "../../util/util.ts";


const Review = ({ reviewDetails }: {reviewDetails: ReviewDetailsFullResponse}) => {
    const { data: userData, isLoading } = useFetch<UserWithProfileResponse>(BABEL_URL + "users/"+reviewDetails.user.username)
    const [profilePicture, setProfilePicture] = useState<string>(userIcon);

    useEffect(() => {
        if(!isLoading && userData !== undefined){
            setProfilePicture(userData.profile.profilePictureUrl === null ? userIcon : generateImageURL(userData.profile.profilePictureUrl))
        }
    }, [isLoading]);

        return (<div className="review-container">
            <div className="review-upper-container">

                <Link className="remove-a-style" to={`/users/${reviewDetails.user.username}`}>
                    <img className="review-profile-img" src={isLoading ? loadingGif : profilePicture} alt="profile picture"/>
                </Link>
                <div>
                    <h2 style={{fontWeight: "400", margin: "0"}}>{reviewDetails.title}</h2>
                    <Link className="remove-a-style" to={`/users/${reviewDetails.user.username}`}>
                        <p style={{color: "#827777", marginTop: "0.25rem"}}>Written by {reviewDetails.user.username}</p>
                    </Link>
                </div>
                <div style={{marginLeft: "auto"}}>
                    <Stars rawScore={reviewDetails.score}/>
                </div>
            </div>
            <div className="review-lower-container">
                <p style={{color: "#717171", marginLeft: "5rem"}}>
                    {reviewDetails.body}
                </p>
            </div>
        </div>)
};

export default Review;