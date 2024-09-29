import libraryBanner from '../../assets/images/library-banner.jpg';
import bookLogo from '../../assets/images/book-logo.png';
import searchIcon from '../../assets/images/icons/search-inverted-icon.png';
import questionMarkIcon from '../../assets/images/icons/question-icon.png';

import './MainPage.css'
import {Link} from "react-router-dom";

import BookSearchResult from "../../interfaces/response/BookSearchResult.ts";
import Book from "../general/Book.tsx";
import ReviewDetailsFullResponse from "../../interfaces/response/ReviewDetailsFullResponse.ts";
import ReviewLog from "../general/ReviewLog.tsx";
import GeneralStatisticsResponse from "../../interfaces/response/GeneralStatisticsResponse.ts";
import useFetch from "../../hooks/useFetch.ts";
import {BABEL_URL} from "../../util/constants.ts";
import {useMemo} from "react";

const MainPage = () => {
    const {data: randomBookData} =
        useFetch<BookSearchResult|undefined>(BABEL_URL+"books/random");

    /* We want to Memoize this object, queryParams is a dependency in the useEffect in the hook useFetch,
    so if we pass it normally a new reference gets created on each rerender, even if the object's properties
    don't change. This triggers an infinite loop.

    useMemo here simply gives us our object reference once at the start on initial mount, and does not change again
    * */
    const paramsForReviews = useMemo(() => ({'orderBy': 'DATE', 'limit': '5', 'page': '0', 'ascDesc': 'ASC'}), []);

    const {data: recentReviews} =
        useFetch<ReviewDetailsFullResponse[]>(BABEL_URL+"reviews/?",
            {queryParams: paramsForReviews});
    const { data: statistics } =
        useFetch<GeneralStatisticsResponse>(BABEL_URL+'stats/');

    return (<div id={"main-page-container"}>
        <div id="main-page-banner-container">
            <div id="main-page-top-panel-container">
                <div id="main-page-logo-container">
                    <img src={bookLogo} alt="book logo"/>
                    BabelPages
                </div>
                <div id="main-page-stats-container">
                    <div className="main-page-single-stat">
                        <p className="main-page-stat-number">
                            {statistics == undefined ? '?' : statistics.reviewCount}
                        </p>
                        <p className="main-page-stat-description">Reviews Written</p>
                    </div>
                    <div className="main-page-single-stat">
                        <p className="main-page-stat-number">
                            {statistics == undefined ? '?' : statistics.usersCount}
                        </p>
                        <p className="main-page-stat-description">Registered Users</p>
                    </div>
                    <div className="main-page-single-stat">
                        <p className="main-page-stat-number">
                            {statistics == undefined ? '?' : statistics.booksCount}
                        </p>
                        <p className="main-page-stat-description">Books in Database</p>
                    </div>
                    <div className="main-page-single-stat">
                        <p className="main-page-stat-number">
                            {statistics == undefined ? '?' : statistics.commonGenre}
                        </p>
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
                {randomBookData !== undefined ? <Book bookData={Object.keys(randomBookData).length === 0 ? undefined: randomBookData}/> : <></> }
            </div>
            <div className="main-page-display-panel">
                <h3>Recent Reviews</h3>
                {recentReviews !== undefined ? recentReviews.map((r) => <ReviewLog key={r.id} details={r}/>)
                : <></>}
            </div>
        </div>

    </div>)
};

export default MainPage;