import React from 'react'
import ReactDOM from 'react-dom/client'

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Navbar from "./components/layout/Navbar.tsx";
import ErrorPage from "./components/error/ErrorPage.tsx";

import './style/global.css';

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>main</div>,
        errorElement: <ErrorPage/>
    }
    ]
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Navbar/>
      <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
