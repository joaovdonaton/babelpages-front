import ReviewDetailsFull from "../../interfaces/ReviewDetailsFull.ts";

import './ReviewLog.css'
import Stars from "./Stars.tsx";

// TODO: make this into a button to book mentioned in review

const ReviewLog = ({details}: {details: ReviewDetailsFull}) => {
    const bookTitleFix = details.bookTitle.length >= 20 ?
        details.bookTitle.substring(0, 20)+'...' : details.bookTitle;

    return <div className="review-log-container">
        <p>
            {details.user.username}
            {' '}
            gave
            {' '}
            <b>{bookTitleFix}</b>
            {' a score of '}
        </p>
        <Stars rawScore={details.score}/>
    </div>
};

export default ReviewLog;