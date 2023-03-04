import React from 'react';
import {
    Stack,
    Box
} from "@mui/material";
import DrawerDesktop from "../components/desktop/DrawerDesktop";
import Header from "../components/desktop/Header";
import {Outlet} from "@mui/icons-material";
import {IsDesktop} from "../components/utils/IsDesktop";
import Footer from "../components/desktop/Footer";

const Homepage = () => {

    const isDesktop:boolean = IsDesktop()

    return (
        <div>
            {isDesktop ?
                <div>
                    <Stack direction="row">
                        <DrawerDesktop/>
                        <Header/>
                    </Stack>
                    <Outlet/>
                    <Footer/>
                </div>
                :
                <div>

                </div>
            }
        </div>
    );
};

export default Homepage;
