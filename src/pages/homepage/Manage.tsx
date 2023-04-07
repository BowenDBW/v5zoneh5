import React from 'react';
import {Box, Divider, Grid, Stack, Tabs, Typography, Tab} from "@mui/material";
import {IsDesktop} from "../../components/utils/IsDesktop";
import {post} from "../../components/utils/Request";
import Admission from "../../components/Admission";
import Article from "../../components/Article";
import Invite from "../../components/Invite";
import Poi from "../../components/Poi";
import {useNavigate} from "react-router-dom/";
import PublicArticle from "../../components/PublicArticle";
import MessageManage from "../../components/MessageManage";
import ImageManage from "../../components/ImageManage";
import LifeCycle from "../../components/LifeCycle";
import PrizeManage from "../../components/PrizeManage";
import Global from "../../GlobalParams";
import Settings from "../../components/Settings";

const Manage = () => {
    const navigate = useNavigate();

    const [isVice, setVice] = React.useState(false);
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function init() {
        post("/auth/is-monitor", localStorage.getItem("v5_token"))
            .then((res: any) => {
                if(res.data === "COMMON"){
                    navigate("/homepage/check-board");
                }
                setVice(res.data === "VICE_CAPTAIN");
            })
    }

    React.useEffect(() => {
        init();
    }, [])

    return (
        <Box>
            {Global.isDesktop ? <div/> :
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
                <Tab label="管理公共页面文章" />
                {isVice ? <Tab label="管理经费审批"/> : <div/>}
                <Tab label="管理奖状"/>
                <Tab label="管理照片墙"/>
                <Tab label="管理留言板"/>
                <Tab label="新队员邀请码"/>
                <Tab label="下载数据"/>
                <Tab label="组员生命周期"/>
                <Tab label="主题背景设置"/>
            </Tabs>
            <Divider/>
            {value === 0 ? <Article/>: <div/>}
            {value === 1 ? <PublicArticle/>: <div/>}
            {value === 2 ? <Admission/>: <div/>}
            {value === 3 ? <PrizeManage/>: <div/>}
            {value === 4 ? <ImageManage/>: <div/>}
            {value === 5 ? <MessageManage/>: <div/>}
            {value === 6 ? <Invite/>: <div/>}
            {value === 7 ? <Poi/>: <div/>}
            {value === 8 ? <LifeCycle/>: <div/>}
            {value === 9 ? <Settings/>: <div/>}
        </Box>
    );
};

export default Manage;
