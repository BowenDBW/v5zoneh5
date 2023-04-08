import React from 'react';
import {Outlet} from "react-router-dom";
import Global from "../GlobalParams";
import Footer from "../components/Footer";
import {Stack} from "@mui/material";
import {postWithoutToken} from "../components/utils/Request";

const Auth = () => {

    const [desktopImage, setDesktopImage]
        = React.useState("");
    const [mobileImage, setMobileImage]
        = React.useState("");

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
        backgroundImage: desktopImage,
    }

    const MOBILE_FEATURE = {
        backgroundImage: mobileImage,
    }

    const init = () => {
        const label = Global.isDesktop ? "login_img_desktop" : "login_img_mobile";
        postWithoutToken("/config/get", {
            token: label,
        }).then((res: any) => {
            console.log(res);
            if (res.status === 200) {
                if (Global.isDesktop) {
                    setDesktopImage("url('" + res.data.msg + "')");
                } else {
                    setDesktopImage("url('" + res.data.msg + "')");
                }
            }
        })
    }

    React.useEffect(() => {
        init();
    }, [])

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
