import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";
import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import userSelfResponse from "../../interfaces/response/UserSelfResponse.ts";
import {UserContext} from "../../context/UserContext.ts";
import * as Cookies from "js-cookie";
import UserSelfResponse from "../../interfaces/response/UserSelfResponse.ts";

const Layout = () => {
    const [user, setUser] = useState<userSelfResponse|undefined>(undefined);

    // check for authenticated user in cookies
    useEffect(() => {
        // TODO: put this bad boy in custom hook
        async function fetchUserInfo(token: string){
                const resp = await fetch(import.meta.env.VITE_API_URL+"users/self",
                    {
                        headers: {
                            "Authorization": "Bearer " + token
                        }
                    });

                if(resp.ok){
                    const userInfo = (await resp.json()) as UserSelfResponse;
                    setUser(userInfo);
                }
        }

        const token = Cookies.default.get("token");

        if(token !== undefined) fetchUserInfo(token);
    }, []);

    return (<div>
        <UserContext.Provider value={{user, setUser}}>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </UserContext.Provider>
    </div>)
};

export default Layout;