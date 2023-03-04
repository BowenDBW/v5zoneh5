import React from 'react';
import {Outlet} from "react-router-dom";
import Global from "../GlobalParams";
import Footer from "../components/desktop/Footer";
import {Stack} from "@mui/material";

const Auth = () => {

    const CSS_BASIC = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
    }

    const DESKTOP_FEATURE = {
        backgroundImage: "url('https://www.npu5v5.cn:8849/album/download/back_desktop.jpg')",
    }

    const MOBILE_FEATURE = {
        backgroundImage: "url('https://www.npu5v5.cn:8849/album/download/back_mobile.jpg')",
    }

    return (
        <Stack style={Global.isDesktop ? {...CSS_BASIC, ...DESKTOP_FEATURE} : {...CSS_BASIC, ...MOBILE_FEATURE}}>
            <Outlet/>
            <Footer/>
        </Stack>
    );
}

export default Auth;
