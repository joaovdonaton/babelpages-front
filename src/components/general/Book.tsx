import BookSearchResult from "../../interfaces/BookSearchResult.ts";

import placeholderCoverImage from '../../assets/images/replacements/cover-unavailable.png';
import loadingGif from '../../assets/images/gifs/loading.gif';

import './Book.css';
import {formatDate} from "../../util/util.ts";
import Stars from "./Stars.tsx";
import useFetchApi from "../../hooks/useFetchApi.ts";

const Book = ({bookData} : {bookData?: BookSearchResult}) => {
    const {data: coverImage} = useFetchApi<string>(bookData === undefined ? null : bookData.coverURL,
        {isImage: true})

    console.log("coverImage: " + coverImage)

    return <div className="book-container">
        <div className="book-cover-container">
            <img src={
                // TODO: fix mess
                bookData !== undefined ?
                    (bookData.coverURL === null ?
                        placeholderCoverImage
                        :
                            (coverImage === undefined ? loadingGif : coverImage)
                    )
                    :
                    placeholderCoverImage
            } alt={`cover for ${bookData && bookData.title}`}
            className="book-cover-image"/>
        </div>
        <div className="book-info-container">
            <p className="book-text-title"> {bookData && bookData.title} </p>
            <p className="book-text-authors"> {bookData && bookData.authors} </p>
            <p className="book-text-pubdate"> {bookData && formatDate(bookData.pubYear, bookData.pubMonth, bookData.pubDay)} </p>
            <Stars rawScore={bookData === undefined ? null : bookData.avgScore} />
        </div>

    </div>
}

export default Book;