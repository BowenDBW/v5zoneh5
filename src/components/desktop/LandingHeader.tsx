import React from 'react';
import {Grid, Divider, Box, Button} from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";

const LandingHeader = () => {

    const navigate = useNavigate();
    const [color1, setColor1] = React.useState("rgb(255,255,255,1)");
    const [color2, setColor2] = React.useState("rgb(255,255,255,0)");

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
                <Grid xs={8}>
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
                <Grid xs={3.5} sx={{textAlign:"right",marginY:2}}>
                    <Button
                        sx={{
                            color:"#000",
                            fontFamily: "font5",
                            fontSize: 20,
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

export default LandingHeader;
