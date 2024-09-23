import {isRouteErrorResponse, Link, useRouteError} from 'react-router-dom'
import './ErrorPage.css'
// import background from '../../assets/images/library-bw.jpg'
import React, {Fragment} from "react";
import GenericClientError from "../../util/GenericClientError.ts";

// TODO: decide on design for this page
// TODO: make errors pretty, handle all kinds of errors

const ErrorPage = () => {
    const error = useRouteError();

    let errorBody: React.ReactNode;

    if(isRouteErrorResponse(error)) {
        errorBody = <Fragment>
            <p style={{color: "red"}}> HTTP Code: {error.status}</p>
            <p>{error.data}</p>
        </Fragment>
    }
    else if(error instanceof GenericClientError) {
        errorBody = <p style={{color: "red"}}>{error.message}</p>
    }
    else {
        errorBody = <p>Unable to load error message.</p>
    }

    return (
        // <div id="error-page-container" style={{backgroundImage: `url(${background})`}}> FOR ALTERNATIVE DESIGN
        <div id="error-page-container">
            <div id="error-page-panel">
                <h3>Something went wrong!</h3>

                {errorBody}

                <Link to="/" id="homepage-button">
                    Return to Home Page
                </Link>
            </div>
        </div>
    )

};

export default ErrorPage;