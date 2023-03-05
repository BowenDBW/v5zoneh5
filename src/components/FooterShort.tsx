import React from 'react';
import {Box, Divider, Typography} from "@mui/material";
import Global from "../GlobalParams";

const FooterShort = () => {
    return (
        <Box
            sx={{
                position: "absolute",
                opacity: 0.6,
                bottom: 0,
                textAlign: "center",
                fontSize: 20,
            }}
        >
            <Divider/>
            <Typography>
                @2003-{new Date().getFullYear()} 西北工业大学-足球机器人创新实践基地V5++组
            </Typography>
            <Typography>
                ICP备案号：<a href="https://beian.miit.gov.cn/">{Global.icp}</a>
            </Typography>
        </Box>
    );
};

export default FooterShort;