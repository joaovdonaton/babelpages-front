import BookSearchResult from "../../interfaces/BookSearchResult.ts";

import placeholderCoverImage from '../../assets/images/replacements/cover-unavailable.png';
import loadingGif from '../../assets/images/gifs/loading.gif';

import './Book.css';
import {formatDate} from "../../util/util.ts";
import Stars from "./Stars.tsx";
import {useEffect, useState} from "react";

const Book = ({bookData} : {bookData?: BookSearchResult}) => {
    const [coverImage, setCoverImage] = useState<string>(loadingGif)

    useEffect(() => {
        async function fetchCover(coverURL: string){
            const resp = await fetch(coverURL);

            if(!resp.ok){
                throw new Error('Failed to retrieve cover');
            }
            setCoverImage(URL.createObjectURL(await resp.blob()));
        }

        if(bookData !== undefined) {
            if (bookData.coverURL !== null) fetchCover(bookData.coverURL);
            else setCoverImage(placeholderCoverImage)
        }
    }, [bookData]);

    return <div className="book-container">
        <div className="book-cover-container">
            <img src={coverImage} alt={`cover for ${bookData && bookData.title}`}
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