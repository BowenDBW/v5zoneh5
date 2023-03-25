import React from 'react';
import {Box, Divider, Grid, Stack, Tabs, Typography, Tab} from "@mui/material";
import {IsDesktop} from "../../components/utils/IsDesktop";
import {post} from "../../components/utils/Request";
import Admission from "../../components/Admission";
import Article from "../../components/Article";
import Invite from "../../components/Invite";
import Poi from "../../components/Poi";

const Manage = () => {
    const isDesktop = IsDesktop()
    const [isVice, setVice] = React.useState(false);
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function init() {
        post("/auth/is-monitor", localStorage.getItem("v5_token"))
            .then((res: any) => {
                setVice(res.data === "VICE_CAPTAIN");
            })
    }

    React.useEffect(() => {
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
                >Zone 管理员界面</Typography>
            }
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="disabled tabs example"
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    flexGrow: 1,
                    top: 80,
                    width: "100%",
                    position: "sticky",
                    backgroundColor: "#FFF",
                    zIndex: 10,
                }}
            >
                <Tab label="管理公告栏" />
                {isVice ? <Tab label="管理经费审批"/> : <div/>}
                <Tab label="新队员邀请码" />
                <Tab label="下载数据" />
            </Tabs>
            <Divider/>
            {value === 0 ? <Article/>: <div/>}
            {value === 1 ? <Admission/>: <div/>}
            {value === 2 ? <Invite/>: <div/>}
            {value === 3 ? <Poi/>: <div/>}
        </Box>
    );
};

export default Manage;
