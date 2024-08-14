import libraryBanner from '../../assets/images/library-banner.jpg';
import bookLogo from '../../assets/images/book-logo.png';
import searchIcon from '../../assets/images/icons/search-inverted-icon.png';
import questionMarkIcon from '../../assets/images/icons/question-icon.png';

import './MainPage.css'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

import BookSearchResult from "../../interfaces/BookSearchResult.ts";
import Book from "../general/Book.tsx";

// todo: add nice loading icon for books

const MainPage = () => {
    const [randomBookData, setRandomBookData] = useState<BookSearchResult>({} as BookSearchResult);

    useEffect(() => {
        async function fetchRandom(){
            const resp = await fetch( import.meta.env.VITE_API_URL+'books/random');

            if(!resp.ok){
                throw new Error('Failed to fetch random book');
            }

            const data = await resp.json() as BookSearchResult;
            setRandomBookData(data);
        }

        fetchRandom();
    }, [])

    return (<div id={"main-page-container"}>
        <div id="main-page-banner-container">
            <div id="main-page-logo-container">
                <img src={bookLogo} alt="book logo"/>
                BabelPages
            </div>
            <img src={libraryBanner} alt="banner-image" id="banner-image"/>
        </div>

        <hr className="divider"/>

        <div id="main-page-icons-container">
            <Link to="/search" className="remove-a-style main-page-icon-link">
                <img src={searchIcon} alt="search icon"/>
                Search
            </Link>
            <Link to="/about" className="remove-a-style main-page-icon-link">
                <img src={questionMarkIcon} alt="about icon"/>
                About
            </Link>
        </div>

        <hr className="divider"/>

        <div id="main-page-display-container">
            <div className="main-page-display-panel">
                <h3>Random Book</h3>
                {Object.keys(randomBookData).length === 0 ? <p> loading</p>: <Book bookData={randomBookData}/>}
            </div>
            <div className="main-page-display-panel">

            </div>
        </div>

    </div>)
};

export default MainPage;