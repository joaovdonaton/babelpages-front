import "./Navbar.css"
import bookLogo from '../../assets/images/book-logo.png';
import searchIcon from '../../assets/images/icons/search-icon.png';

const Navbar = () => {
    return (
        <div id="navbar-container">
            <div id="navbar-logo-container">
                <img src={bookLogo} alt="booklogo" id={"book-logo"} />
                BabelPages
            </div>
            <div id="navbar-search-container">
                <form>
                    <input type={"text"} placeholder={"Search..."}/>
                    <a>
                        <img src={searchIcon} alt={"search icon"} id={"search-bar-icon"}/>
                    </a>
                </form>
            </div>
            <div id="navbar-link-container">
                <a>Explore</a>
                <a>Reviews</a>
                <a>Sign In</a>
            </div>
        </div>
    );
};

export default Navbar;