import React from 'react';
import {
    Stack,
    Box,
    Grid,
} from '@mui/material';
import LandingHeader from "../components/desktop/LandingHeader";
import LandingContent from "../components/LandingContent";
import LandingJoinUs from "../components/LandingJoinUs";
import Footer from "../components/Footer";

const LandingPage = () => {
    return (
        <div>
            <Stack>
                <LandingHeader/>
                <LandingContent/>
                <LandingJoinUs/>
                <Footer/>
            </Stack>
        </div>
    );
};

export default LandingPage;
