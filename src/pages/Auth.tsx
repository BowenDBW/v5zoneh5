import React from 'react';
import {Outlet} from "react-router-dom";
import Global from "../GlobalParams";
import Footer from "../components/Footer";
import {Stack} from "@mui/material";
import GlobalParams from "../GlobalParams";

const Auth = () => {

    const CSS_BASIC = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "102vh",
        width: "100%",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
    }

    const DESKTOP_FEATURE = {
        backgroundImage: "url('" + GlobalParams.baseUrl + "/album/download/back_desktop.jpg')",
    }

    const MOBILE_FEATURE = {
        backgroundImage: "url('" + GlobalParams.baseUrl + "/album/download/back_mobile.jpg')",
    }

    return (
        <Stack
            style={Global.isDesktop ?
                {...CSS_BASIC, ...DESKTOP_FEATURE}
                :
                {...CSS_BASIC, ...MOBILE_FEATURE}}
        >
            <Outlet/>
            <Footer bottom={-24}/>
        </Stack>
    );
}

export default Auth;
