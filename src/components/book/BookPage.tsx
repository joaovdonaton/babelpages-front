import {useParams} from "react-router-dom";
import useFetch from "../../hooks/useFetch.ts";
import BookDetailsResponse from "../../interfaces/response/BookDetailsResponse.ts";
import {BABEL_URL} from "../../util/constants.ts";

import placeholderCoverImage from '../../assets/images/replacements/cover-unavailable.png';
import loadingGif from '../../assets/images/gifs/loading.gif';
import barcodeIcon from '../../assets/images/icons/barcode-icon.png'
import reviewIcon from '../../assets/images/icons/review-icon.png'
import languageIcon from '../../assets/images/icons/language-icon.png'

import './BookPage.css';
import {formatDate} from "../../util/util.ts";
import ReviewDetailsResponse from "../../interfaces/response/ReviewDetailsResponse.ts";
import Review from "./Review.tsx";

// TODO: maybe make reviews section paginated (requires backend updates)

const BookPage = () => {
    const {id} = useParams();
    const {data: bookData, isLoading: isBookLoading} =
        useFetch<BookDetailsResponse>(BABEL_URL+"books/"+id)
    const {data: reviews, isLoading: isReviewsLoading} =
        useFetch<ReviewDetailsResponse[]>(BABEL_URL+"reviews/"+id);

    if(isBookLoading){
        return <div id="book-page-container">
            <img src={loadingGif} alt="loading gif"/>
        </div>
    }
    else if(bookData !== undefined && !isBookLoading){
        return (<div id="book-page-container">
            <div id="book-page-info-container">
                <div id="book-page-cover-container">
                    <img id="book-page-cover-img"
                        src={bookData.coverURL === null ? placeholderCoverImage : bookData.coverURL} alt="cover"/>
                </div>
                <div id="book-page-details-container">
                    <h1>{bookData.title}</h1>
                    <p>{bookData.authors.join(", ")}</p>
                    <p>{formatDate(bookData.pubYear, bookData.pubMonth, bookData.pubDay)}</p>
                    <p>{bookData.description}</p>

                    <div id="book-page-details-icons-container">
                        <div className="book-page-single-icon">
                            <p>ISBN</p>
                            <img className="book-page-icon" src={barcodeIcon} alt="icon"/>
                            <p>{bookData.isbn}</p>
                        </div>
                        <div className="book-page-single-icon">
                            <p>Language</p>
                            <img className="book-page-icon" src={languageIcon} alt="icon"/>
                            <p>{bookData.language}</p>
                        </div>
                        <div className="book-page-single-icon">
                            <p>Reviews</p>
                            <img className="book-page-icon" src={reviewIcon} alt="icon"/>
                            <p>REPLACE</p>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="divider"/>

            <div id="book-page-reviews-container">
                <h1 style={{alignSelf: "flex-start", fontWeight: "400"}}>Reviews</h1>

                {
                    isReviewsLoading ?
                        <img src={loadingGif} alt="loading gif"/>
                        :
                        (<>
                        {// I think it's okay to use the ! here because if isReviewsLoading === false then reviews !== undefined, right???
                            reviews!.map((review) => (
                            <Review key={review.id} reviewDetails={review}/>
                        ))}
                        </>)
                }
            </div>
        </div>)
    }
    else{
        throw new Error("Failed to load book.");
    }
};

export default BookPage;