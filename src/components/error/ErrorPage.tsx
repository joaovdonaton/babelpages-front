import {isRouteErrorResponse, Link, useRouteError} from 'react-router-dom'
import './ErrorPage.css'
// import background from '../../assets/images/library-bw.jpg'
import {Fragment} from "react";

// TODO: decide on design for this page
// TODO: make errors pretty, handle all kinds of errors

const ErrorPage = () => {
    const error = useRouteError();

    return(
        // <div id="error-page-container" style={{backgroundImage: `url(${background})`}}> FOR ALTERNATIVE DESIGN
        <div id="error-page-container">
            <div id="error-page-panel">
                <h3>Something went wrong!</h3>
                {
                    isRouteErrorResponse(error) ?
                        <Fragment>
                            <p style={{color: "red"}}> HTTP Code: {error.status}</p>
                            <p>{error.data}</p>
                        </Fragment>
                        :
                        <p>Unable to load error message.</p>
                }

                <Link to="/" id="homepage-button">
                    Return to Home Page
                </Link>
            </div>
        </div>
    )

};

export default ErrorPage;