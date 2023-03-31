import React from 'react';
import {Box, Stack} from "@mui/material";
import DrawerDesktop from "../components/desktop/DrawerDesktop";
import HeaderDesktop from "../components/desktop/HeaderDesktop";
import {IsDesktop} from "../components/utils/IsDesktop";
import HeaderMobile from "../components/mobile/HeaderMobile";
import {Outlet} from "react-router-dom";

const Homepage = () => {

    const isDesktop: boolean = IsDesktop();

    return (
        <div>
            {isDesktop ?
                <div>
                    <Stack direction="row">
                        <DrawerDesktop width="15%"/>
                        <Box sx={{width : "85%"}}>
                            <HeaderDesktop/>
                            <Outlet/>
                        </Box>
                    </Stack>
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
