import React from 'react'
import ReactDOM from 'react-dom/client'

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Navbar from "./components/layout/Navbar.tsx";
import ErrorPage from "./components/error/ErrorPage.tsx";
import Footer from './components/layout/Footer.tsx'


import './style/global.css';

const router = createBrowserRouter([
    {
        path: "/",
        element: <div style={{height: "100vh"}}>main</div>,
        errorElement: <ErrorPage/>
    }
    ]
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Navbar/>
      <RouterProvider router={router}></RouterProvider>
      <Footer/>
  </React.StrictMode>,
)
