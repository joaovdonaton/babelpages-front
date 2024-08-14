import BookSearchResult from "../../interfaces/BookSearchResult.ts";

import placeholderCoverImage from '../../assets/images/replacements/cover-unavailable.png';

import './Book.css';
import {formatDate} from "../../util/util.ts";
import Stars from "./Stars.tsx";

// todo: add component for stars based on score

const Book = ({bookData} : {bookData: BookSearchResult}) => {
    return <div className="book-container">
        <div className="book-cover-container">
            <img src={bookData.coverURL === null ? placeholderCoverImage: bookData.coverURL} alt={`cover for ${bookData.title}`}
            className="book-cover-image"/>
        </div>
        <div className="book-info-container">
            <p className="book-text-title"> {bookData.title} </p>
            <p className="book-text-authors"> {bookData.authors} </p>
            <p className="book-text-pubdate"> {formatDate(bookData.pubYear, bookData.pubMonth, bookData.pubDay)} </p>
            <Stars rawScore={bookData.avgScore} />
        </div>

    </div>
}

export default Book;