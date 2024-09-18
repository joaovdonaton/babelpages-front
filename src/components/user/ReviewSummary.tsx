import Stars from "../general/Stars.tsx";
import ReviewDetailsFullResponse from "../../interfaces/response/ReviewDetailsFullResponse.ts";
import {Link} from "react-router-dom";

const ReviewSummary = ({ reviewDetails }: {reviewDetails: ReviewDetailsFullResponse}) => {
    return (
        <Link className="remove-a-style" to={`/books/${reviewDetails.bookId}`}>
            <div className="review-container-small">
                <div>
                    <h3>{reviewDetails.bookTitle}</h3>
                    <p style={{'color': "#717171", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{reviewDetails.body}</p>
                </div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Stars rawScore={reviewDetails.score}/>
                </div>
            </div>
        </Link>)
};

export default ReviewSummary;