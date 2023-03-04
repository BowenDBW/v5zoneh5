import React from 'react';
import {
    Stack,
    Box
} from "@mui/material";
import Global from "../GlobalParams";
import DrawerDesktop from "../components/desktop/DrawerDesktop";
import Header from "../components/desktop/Header";
import {Outlet} from "@mui/icons-material";

const Homepage = () => {

    return (
        <div>
            <Stack direction="row">
                <DrawerDesktop/>
                <Header/>
            </Stack>
            <Outlet/>
        </div>
    );
};

export default Homepage;
