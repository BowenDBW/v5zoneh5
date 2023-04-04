import React from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import LandingHeaderDesktop from "../components/desktop/LandingHeaderDesktop";
import LandingContent from "../components/LandingContent";
import LandingJoinUs from "../components/LandingJoinUs";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import {Link, Element, scroller} from 'react-scroll';
import Box from "@mui/material/Box";
import Footer from "../components/Footer"

const LandingPage = () => {
    const [renderImage, setRenderImages] = React.useState("v5_all.png");
    const [color, setColor] = React.useState("#727272");

    return (
        <div>
            <img src={require("../assets/imgs/" + renderImage)}
                 style={{
                     zIndex: -10,
                     width: "100%",
                     height: window.innerHeight,
                     position: "absolute",
                     opacity: 0.9,
                 }}
                 alt={'v5logo'}>
            </img>

            <Stack sx={{alignItems: "center"}}>
                <LandingHeaderDesktop/>
                <Typography
                    sx={{
                        position: "absolute",
                        zIndex: 10,
                        display: "flex",
                        bottom: "14%",
                        textAlign: "center",
                        fontSize: 36,
                        fontFamily: "font2",
                        color: color,
                    }}
                >
                    无人机 足球仿真赛 Robomaster
                </Typography>
                <Grid container>
                    <Grid xs={4.8}></Grid>
                    <Grid xs={6}>
                        <Link
                            activeClass="active"
                            to="scroll-to-element"
                            spy={true}
                            smooth={true}
                            offset={400}
                            duration={500}
                        >
                        <Button
                            variant="outlined"
                            sx={{
                                position: "absolute",
                                zIndex: 10,
                                width: "20%",
                                display: "flex",
                                alignItems: "center",
                                bottom: "7%",
                                borderRadius: 5,
                                fontSize: 20,
                                fontFamily: "font5",
                                borderColor: color,
                                color: color,
                            }}
                            endIcon={<KeyboardDoubleArrowDownIcon/>}
                        >

                                了解更多
                        </Button></Link>
                    </Grid>
                    <Grid xs={1.2}></Grid>
                </Grid>
                <Box sx={{position: "absolute", bottom: -720}}>
                    <Element name="scroll-to-element" className="element">
                        <LandingContent/>
                    </Element>
                </Box>
                <LandingJoinUs/>
                <Footer bottom={-750}/>
            </Stack>
        </div>
    );
};

export default LandingPage;
