import "./Navbar.css"
import bookLogo from '../../assets/images/book-logo.png';
import searchIcon from '../../assets/images/icons/search-icon.png';
import sidenavIcon from '../../assets/images/icons/sidenav-icon.png';
import sidenavCloseIcon from '../../assets/images/icons/sidenav-close-icon.png';
import {Link, useNavigate} from "react-router-dom";
import React, {Fragment, useContext, useEffect, useState} from "react";

import '../../style/global.css'
import {UserContext} from "../../context/UserContext.ts";
import * as Cookies from "js-cookie";

const Navbar = () => {
    const [isSidebarOpen, setSidebarOpen] = React.useState(false);
    const [isProfileNavOpen, setProfileNavOpen] = React.useState(false);
    const [username, setUsername] = useState<string|undefined>(undefined);
    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    const switchSidebarState = () => {
        setSidebarOpen(!isSidebarOpen);
    }

    const switchProfileNavState = () => {
        setProfileNavOpen(!isProfileNavOpen);
    }

    const logout = () => {
        Cookies.default.remove("token");
        navigate("/")
        location.reload();
    }

    useEffect(() => {
        if(user !== undefined){
            setUsername(user.username)
        }
    }, [user]);

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
                        {username !== undefined ?
                            <a className="remove-a-style navigation-link-button" onClick={switchProfileNavState}>
                                {username}
                            </a>
                            :
                        <Link to="/login" className="remove-a-style navigation-link-button">
                            Sign In
                        </Link>
                        }
                    </div>
                    <a id={"sidenav-button"} onClick={switchSidebarState}>
                        <img src={sidenavIcon} alt={"sidenav icon"}/>
                    </a>
                </div>

                {(isSidebarOpen || isProfileNavOpen) && <div id="background-opacity" onClick={
                    () => {
                        if(isProfileNavOpen) switchProfileNavState();
                        if(isSidebarOpen) switchSidebarState();
                    }
                }></div>}

                {/*side navbar (initially hidden, on left side)*/}
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

                {/* profile nav (right side) */}
                <div id="profile-nav-container" className={isProfileNavOpen ? 'profile-nav-open' : 'sidenav-closed'}>
                    <img src={sidenavCloseIcon} alt={"close button"}
                         className={`profile-nav-close-button ${isProfileNavOpen ? 'profile-nav-close-button-visible' : ''}`}
                         onClick={switchProfileNavState}/>
                    <Link to={`/users/${username}`} className="remove-a-style profile-nav-button" onClick={switchProfileNavState}>My Profile</Link>
                    <a className="remove-a-style profile-nav-button" onClick={logout}>Sign Out</a>
                </div>
            </div>
        </Fragment>
    );
};

export default Navbar;