import React from 'react';
import {Grid, Divider, Box, Button} from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";

const LandingHeader = () => {
    const navigate = useNavigate();

    return (
        <Box>
            <Grid container>
                <Grid xs={4}>
                    <Typography
                        sx={{
                            margin: 2,
                            marginLeft: 6,
                            textAlign: "left",
                            fontFamily: "font5",
                            fontSize: 32,
                        }}
                    >
                        足球机器人基地 V5++组
                    </Typography>
                </Grid>
                <Grid xs={4}/>
                <Grid xs={3.5} sx={{textAlign:"right",marginY:2}}>
                    <Button
                        sx={{color:"#000",fontFamily: "font5", fontSize: 20}}
                        variant="text"
                        endIcon={<AccountBoxIcon/>}
                        onClick={()=>{navigate("/auth/login")}}
                    >
                        队员登录
                    </Button>
                </Grid>
            </Grid>
            <Divider/>
        </Box>
    );
};

export default LandingHeader;
