import Auth from "../pages/Auth"
import Login from "../pages/auth/Login"
import Reset from "../pages/auth/Reset"
import Registry from "../pages/auth/Registry"
import {Navigate} from "react-router-dom";
import Homepage from "../pages/Homepage";
import MessageBoard from "../pages/homepage/MessageBoard";
import {Album} from "@mui/icons-material";
import Manage from "../pages/homepage/Manage";
import Budget from "../pages/homepage/Budget";
import Prize from "../pages/homepage/Prize";
import Profile from "../pages/homepage/Profile";
import CheckBoard from "../pages/homepage/CheckBoard";
import Contact from "../pages/homepage/Contact";
import ImageBoard from "../pages/homepage/ImageBoard";
import Settings from "../pages/homepage/Settings";

function ImageBad() {
    return null;
}

export default [
    {
        path: '/auth',
        element: <Auth/>,
        children: [
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'reset',
                element: <Reset/>
            },
            {
                path: 'registry',
                element: <Registry/>
            },
        ]
    },
    {
        path: "/homepage",
        element: <Homepage/>,
        children: [
            {
                path: 'manage',
                element: <Manage/>
            },
            {
                path: 'check-board',
                element: <CheckBoard/>
            },
            {
                path: 'image-board',
                element: <ImageBoard/>,
            },
            {
                path: 'image-bad',
                element: <ImageBad/>,
            },
            {
                path: 'contact',
                element: <Contact/>,
            },
            {
                path: 'message-board',
                element: <MessageBoard/>
            },
            {
                path: 'prize',
                element: <Prize/>
            },
            {
                path: 'settings',
                element: <Settings/>
            },
            {
                path: 'budget',
                element: <Budget/>
            },
            {
                path: "profile",
                element: <Profile/>
            },
        ]
    },
    {
        path: "/",
        element: <Navigate to="/auth/login"/>
    }
]
