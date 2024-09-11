// import React from 'react'
import ReactDOM from 'react-dom/client'

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./components/error/ErrorPage.tsx";

import './style/global.css';
import MainPage from "./components/main/MainPage.tsx";
import Layout from "./components/layout/Layout.tsx";
import LoginPage from "./components/login/LoginPage.tsx";
import BookPage from "./components/book/BookPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        // will be rendered in the <Outlet/> tag inside <Layout/>
        children: [
            {
                path: "/",
                element: <MainPage/>,
            },
            {
                path: "/login",
                element: <LoginPage/>,
            },
            {
                path: "/books/:id",
                element: <BookPage/>
            }
        ],
        errorElement: <ErrorPage/>
    }]
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  //<React.StrictMode>
        <RouterProvider router={router}/>
  //</React.StrictMode>,
)
