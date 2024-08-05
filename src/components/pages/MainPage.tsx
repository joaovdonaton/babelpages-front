import libraryBanner from '../../assets/images/library-banner.jpg';
import bookLogo from '../../assets/images/book-logo.png';

import './MainPage.css'

const MainPage = () => {
    return (<div id={"main-page-container"}>
        <div id="main-page-banner-container">
            <div id="main-page-logo-container">
                <img src={bookLogo} alt="book logo"/>
                BabelPages
            </div>
            <img src={libraryBanner} alt="banner-image" id="banner-image"/>
        </div>

        <hr className="divider"/>
            icons here
        <hr className="divider"/>

    </div>)
};

export default MainPage;