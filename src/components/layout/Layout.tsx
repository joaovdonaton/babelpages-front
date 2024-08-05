import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";
import {Outlet} from "react-router-dom";

const Layout = () => (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
);

export default Layout;