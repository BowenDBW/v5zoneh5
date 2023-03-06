import React, {useEffect, useState} from 'react';
import {Box, Divider, Grid, Stack, Typography} from "@mui/material";
import {IsDesktop} from "../../components/utils/IsDesktop";
import {post} from "../../components/utils/Request";
import Admission from "../../components/Admission";
import Article from "../../components/Article";
import Invite from "../../components/Invite";
import Poi from "../../components/Poi";

const Manage = () => {
    const isDesktop = IsDesktop()

    const [isVice, setVice] = useState(false);


    function init() {
        post("/auth/is_monitor", localStorage.getItem("v5_id"))
            .then((res: any) => {
                setVice(res.data === "VICE_CAPTAIN");
            })
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <Box>
            {isDesktop ? <div/> :
                <Typography
                    align="center"
                    sx={{
                        fontFamily: "黑体",
                        fontSize: 20,
                        fontWeight: "bold",
                        height: 32,
                        marginTop: 2
                    }}
                >Zone 设置</Typography>
            }
            {isDesktop ?
                <Grid container spacing={2}>
                    <Grid xs={1}></Grid>
                    <Grid xs={10}>
                        {isVice ? <Admission/> : <div/>}
                    </Grid>
                    <Grid xs={1}></Grid>
                    <Grid xs={1}></Grid>
                    <Grid xs={10}>
                        <Article/>
                    </Grid>
                    <Grid xs={1}></Grid>
                    <Grid xs={3}></Grid>
                    <Grid xs={6}>
                        <Invite></Invite>
                    </Grid>
                    <Grid xs={3}></Grid>
                    <Grid xs={3}></Grid>
                    <Grid xs={6}>
                        <Poi/>
                    </Grid>
                    <Grid xs={3}></Grid>
                </Grid>
                :
                <Stack>
                    <Divider/>
                    {isVice ? <Admission/> : <div/>}
                    <Divider/>
                    <Article/>
                    <Divider/>
                    <Invite/>
                    <Divider/>
                    <Poi/>
                    <Divider/>
                </Stack>
            }
        </Box>
    );
};

export default Manage;
