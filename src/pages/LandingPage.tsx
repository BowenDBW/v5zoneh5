import React from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import LandingHeaderDesktop from "../components/desktop/LandingHeaderDesktop";
import LandingContentDeskop from "../components/desktop/LandingContentDeskop";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import {Link, Element, scroller} from 'react-scroll';
import Box from "@mui/material/Box";
import Footer from "../components/Footer"
import Global from "../GlobalParams";
import {post} from "../components/utils/Request";

const LandingPage = () => {
    const [renderImage, setRenderImages] = React.useState("");
    const [color, setColor] = React.useState("#727272");
    const [contentHeight, setContentHeight] = React.useState(0);
    const init = () => {
        const label1 = Global.isDesktop ? "landing_page_img_desktop" : "landing_page_img_mobile";
        post("/config/get", {
            token: label1,
        }).then((res: any) => {
            if (res.status === 200) {
                setRenderImages(res.data.msg);
            }
        })
        const label2 = Global.isDesktop ? "landing_page_font_color_desktop" : "landing_page_font_color_mobile";
        post("/config/get", {
            token: label2,
        }).then((res: any) => {
            if (res.status === 200) {
                setColor(res.data.msg);
            }
        })
    }

    React.useEffect(()=>{
        init();
    },[])

    return (
        <div>
            <img src={renderImage}
                 style={{
                     zIndex: -10,
                     width: "100%",
                     height: "100vh",
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
                <Box sx={{position: "absolute", bottom: contentHeight, width:"100%"}}>
                    <Element name="scroll-to-element" className="element">
                        <LandingContentDeskop setContentHeight={setContentHeight}/>
                    </Element>
                </Box>
                <Footer bottom={contentHeight - 26}/>
            </Stack>
        </div>
    );
};

export default LandingPage;
