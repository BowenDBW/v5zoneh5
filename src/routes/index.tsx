import Auth from "../pages/Auth"
import Login from "../pages/auth/Login"
import Reset from "../pages/auth/Reset"
import Registry from "../pages/auth/Registry"
import {Navigate} from "react-router-dom";

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
        path: "/",
        element: <Navigate to="/auth/login"/>
    }
]
