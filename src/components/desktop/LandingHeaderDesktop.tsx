import React from 'react';
import {Grid, Box, Button} from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Typography from "@mui/material/Typography";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import {useNavigate} from "react-router-dom";

const LandingHeaderDesktop = () => {

    const navigate = useNavigate();
    const [color1, setColor1] = React.useState("rgb(255,255,255,1)");
    const [color2, setColor2] = React.useState("rgb(255,255,255,0)");

    const openInNewTab = (url: string) => {
        // 👇️ setting target to _blank with window.open
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <Box
            sx={{
                background: `linear-gradient(${color1}, ${color2})`,
                position:"fixed",
                width:"100%",
                height:"50%",
                opacity:0.7,
            }}
        >
            <Grid container>
                <Grid xs={6}>
                    <Typography
                        sx={{
                            margin: 2,
                            marginLeft: 6,
                            textAlign: "left",
                            fontFamily: "font2",
                            fontSize: 36,
                            fontWeight: "bold",
                        }}
                    >
                        足球机器人基地 V5++组
                    </Typography>
                </Grid>
                <Grid xs={6} sx={{textAlign:"right",marginY:2}}>
                    <Button
                        sx={{
                            color:"#000",
                            fontFamily: "font5",
                            fontSize: 20,
                            marginRight: 4
                        }}
                        variant="text"
                        endIcon={<CloudDownloadIcon/>}
                        onClick={()=>{
                            openInNewTab("https://files.npu5v5.cn/");
                        }}
                    >
                        共享资料
                    </Button>
                    <Button
                        sx={{
                            color:"#000",
                            fontFamily: "font5",
                            fontSize: 20,
                            marginRight: 4
                        }}
                        variant="text"
                        endIcon={<AccountBoxIcon/>}
                        onClick={()=>{navigate("/auth/login")}}
                    >
                        队员登录
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LandingHeaderDesktop;
