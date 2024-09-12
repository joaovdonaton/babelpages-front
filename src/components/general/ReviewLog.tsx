import ReviewDetailsFullResponse from "../../interfaces/response/ReviewDetailsFullResponse.ts";

import './ReviewLog.css'
import Stars from "./Stars.tsx";
import {Link} from "react-router-dom";

// TODO: make this into a button to book mentioned in review

const ReviewLog = ({details}: {details: ReviewDetailsFullResponse}) => {
    const bookTitleFix = details.bookTitle.length >= 20 ?
        details.bookTitle.substring(0, 20)+'...' : details.bookTitle;

    return (<Link className="remove-a-style review-log-container" to={`/books/${details.bookId}`}>
        <p>
            {details.user.username}
            {' '}
            gave
            {' '}
            <b>{bookTitleFix}</b>
            {' a score of '}
        </p>
        <Stars rawScore={details.score}/>
    </Link>)
};

export default ReviewLog;