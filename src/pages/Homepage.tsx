import React from 'react';
import {
    Stack,
} from "@mui/material";
import DrawerDesktop from "../components/desktop/DrawerDesktop";
import HeaderDesktop from "../components/desktop/HeaderDesktop";
import {Outlet} from "@mui/icons-material";
import {IsDesktop} from "../components/utils/IsDesktop";
import HeaderMobile from "../components/mobile/HeaderMobile";

const Homepage = () => {

    const isDesktop:boolean = IsDesktop()

    return (
        <div>
            {isDesktop ?
                <div>
                    <Stack direction="row">
                        <DrawerDesktop/>
                        <HeaderDesktop/>
                    </Stack>
                    <Outlet/>
                </div>
                :
                <div>
                    <Stack>
                        <HeaderMobile/>
                    </Stack>
                </div>
            }
        </div>
    );
};

export default Homepage;
