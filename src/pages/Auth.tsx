import React from 'react';
import {Outlet} from "react-router-dom";
import {IsDesktop} from "../components/utils/IsDesktop";
import Footer from "../components/desktop/Footer";

const Auth = () => {

    const isDesktop = IsDesktop()

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
        <div style={isDesktop ? {...CSS_BASIC, ...DESKTOP_FEATURE} : {...CSS_BASIC, ...MOBILE_FEATURE}}>
            <Outlet/>
            <Footer/>
        </div>
    );
}

export default Auth;
