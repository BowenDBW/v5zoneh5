import React from 'react';
import {Outlet} from "react-router-dom";
import Global from "../GlobalParams";
import Footer from "../components/Footer";
import {Stack} from "@mui/material";

const Auth = () => {

    const [desktopImage, setDesktopImage]
        = React.useState("back_desktop.jpg");
    const [mobileImage, setMobileImage]
        = React.useState("back_mobile.jpg");

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
        backgroundImage: "url('" + Global.baseUrl + "/album/download/')" + desktopImage,
    }

    const MOBILE_FEATURE = {
        backgroundImage: "url('" + Global.baseUrl + "/album/download/')" + mobileImage,
    }

    const init = () => {

    }

    React.useEffect(()=>{

    },[])

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
