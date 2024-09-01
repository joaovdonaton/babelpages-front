import "./Navbar.css"
import bookLogo from '../../assets/images/book-logo.png';
import searchIcon from '../../assets/images/icons/search-icon.png';
import sidenavIcon from '../../assets/images/icons/sidenav-icon.png';
import sidenavCloseIcon from '../../assets/images/icons/sidenav-close-icon.png';
import {Link} from "react-router-dom";
import React, {Fragment} from "react";

import '../../style/global.css'

const Navbar = () => {
    const [isSidebarOpen, setSidebarOpen] = React.useState(false);

    const switchSidebarState = () => {
        setSidebarOpen(!isSidebarOpen);
    }

    return (
        <Fragment>
            <div id="navbar-container">
                <div className="navbar-row-container" id="navbar-logo-container">
                    <Link to="/" className="remove-a-style" style={{display: "contents"}}>
                        <img src={bookLogo} alt="booklogo" id={"navbar-book-logo"} />
                        BabelPages
                    </Link>
                </div>
                <div className="navbar-row-container" id="navbar-search-container">
                    <form>
                        <input type={"text"} placeholder={"Search..."}/>
                        <a>
                            <img src={searchIcon} alt={"search icon"} id={"search-bar-icon"}/>
                        </a>
                    </form>
                </div>
                <div className="navbar-row-container" id="navbar-link-container">
                    <div id="full-links-container">
                        <Link to="/search" className="remove-a-style navigation-link-button">
                            Explore
                        </Link>
                        <Link to="/reviews" className="remove-a-style navigation-link-button">
                            Reviews
                        </Link>
                        <Link to="/login" className="remove-a-style navigation-link-button">
                            Sign In
                        </Link>
                    </div>
                    <a id={"sidenav-button"} onClick={switchSidebarState}>
                        <img src={sidenavIcon} alt={"sidenav icon"}/>
                    </a>
                </div>

                {/*side navbar (initially hidden)*/}
                {isSidebarOpen && <div id="background-opacity"></div>}
                <div id="sidenav-container" className={ isSidebarOpen ? 'sidenav-open' : 'sidenav-closed'}>
                    <img src={sidenavCloseIcon} alt={"close button"} id="sidenav-close-button" onClick={switchSidebarState}/>

                    <div id="sidenav-links-container">
                        <Link to="/" className="remove-a-style navigation-link-button" onClick={switchSidebarState}>
                            Home
                        </Link>
                        <Link to="/search" className="remove-a-style navigation-link-button" onClick={switchSidebarState}>
                            Explore
                        </Link>
                        <Link to="/reviews" className="remove-a-style navigation-link-button" onClick={switchSidebarState}>
                            Reviews
                        </Link>
                        <Link to="/login" className="remove-a-style navigation-link-button" onClick={switchSidebarState}>
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Navbar;