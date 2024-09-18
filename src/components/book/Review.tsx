import './Review.css'

import userIcon from '../../assets/images/icons/user-icon.png'
import Stars from "../general/Stars.tsx";
import ReviewDetailsFullResponse from "../../interfaces/response/ReviewDetailsFullResponse.ts";

// TODO: get profile pictures for users, decide on how we fetch that frcm backend
// TODO: button for writing your own review if you're authenticated

const Review = ({ reviewDetails, reviewType }: {reviewDetails: ReviewDetailsFullResponse, reviewType: 'PROFILE' | 'MAIN'}) => {
    if(reviewType === 'MAIN') {
        return (<div className="review-container">
            <div className="review-upper-container">
                <img className="review-profile-img" src={userIcon} alt="placeholder profile picture"/>
                <div>
                    <h2 style={{fontWeight: "400", margin: "0"}}>{reviewDetails.title}</h2>
                    <p style={{color: "#827777", marginTop: "0.25rem"}}>Written by {reviewDetails.user.username}</p>
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
    }
    else{
        return (<div className="review-container-small">
            <div>
                <h3>{reviewDetails.bookTitle}</h3>
                <p style={{'color': "#717171", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{reviewDetails.body}</p>
            </div>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
               <Stars rawScore={reviewDetails.score}/>
            </div>
        </div>)
    }
};

export default Review;