import libraryBanner from '../../assets/images/library-banner.jpg';
import bookLogo from '../../assets/images/book-logo.png';
import searchIcon from '../../assets/images/icons/search-inverted-icon.png';
import questionMarkIcon from '../../assets/images/icons/question-icon.png';

import './MainPage.css'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

import BookSearchResult from "../../interfaces/BookSearchResult.ts";
import Book from "../general/Book.tsx";
import ReviewDetailsFull from "../../interfaces/ReviewDetailsFull.ts";
import ReviewLog from "../general/ReviewLog.tsx";
import GeneralStatisticsResponse from "../../interfaces/GeneralStatisticsResponse.ts";

const MainPage = () => {
    const [randomBookData, setRandomBookData] = useState<BookSearchResult>({} as BookSearchResult);
    const [recentReviews, setRecentReviews] = useState<ReviewDetailsFull[]>([]);
    const [statistics, setStatistics] = useState<GeneralStatisticsResponse>({} as GeneralStatisticsResponse);

    // random book data
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

    // fetch 5 most recent reviews
    useEffect(() => {
        async function fetchRecentReviews(){
            const resp = await fetch( import.meta.env.VITE_API_URL+'reviews/?'
            + (new URLSearchParams({'orderBy': 'DATE', 'limit': '5', 'page': '0', 'ascDesc': 'ASC'})).toString());

            if(!resp.ok){
                throw new Error('Failed to fetch recent reviews');
            }

            // apparently typescript thinks the fields in the object of this array may be undefined
            const jsonData = await resp.json() as ReviewDetailsFull[];

            setRecentReviews(jsonData);
        }

        fetchRecentReviews();
    }, []);

    // fetch statistics
    useEffect(() => {
        async function fetchStats(){
            const resp = await fetch( import.meta.env.VITE_API_URL+'stats/');

            if(!resp.ok){
                throw new Error('Failed to fetch statistics');
            }

            const jsonData = await resp.json() as GeneralStatisticsResponse;

            setStatistics(jsonData);
        }

        fetchStats();
    }, []);

    return (<div id={"main-page-container"}>
        <div id="main-page-banner-container">
            <div id="main-page-top-panel-container">
                <div id="main-page-logo-container">
                    <img src={bookLogo} alt="book logo"/>
                    BabelPages
                </div>
                <div id="main-page-stats-container">
                    <div className="main-page-single-stat">
                        <p className="main-page-stat-number">{statistics.reviewCount}</p>
                        <p className="main-page-stat-description">Reviews Written</p>
                    </div>
                    <div className="main-page-single-stat">
                        <p className="main-page-stat-number">{statistics.usersCount}</p>
                        <p className="main-page-stat-description">Registered Users</p>
                    </div>
                    <div className="main-page-single-stat">
                        <p className="main-page-stat-number">{statistics.booksCount}</p>
                        <p className="main-page-stat-description">Books in Database</p>
                    </div>
                    <div className="main-page-single-stat">
                        <p className="main-page-stat-number">{statistics.commonGenre}</p>
                        <p className="main-page-stat-description">Most Common Genre</p>
                    </div>
                </div>
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
                <Book bookData={Object.keys(randomBookData).length === 0 ? undefined: randomBookData}/>
            </div>
            <div className="main-page-display-panel">
                <h3>Recent Reviews</h3>
                {recentReviews.map((r) => <ReviewLog key={r.id} details={r}/>)}
            </div>
        </div>

    </div>)
};

export default MainPage;