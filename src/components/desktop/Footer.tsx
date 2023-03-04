import React from 'react';
import Global from "../../GlobalParams";
import {Box, Typography} from "@mui/material";

const Footer = () => {

    return (
        <Box
            sx={{
                position: "absolute",
                backgroundColor: "#c5c5c5",
                opacity: 0.6,
                width: window.innerWidth,
                bottom: 0,
                textAlign: "center",
                fontSize: 20,
            }}
        >
            <Typography>
                @2003-{new Date().getFullYear()} 西北工业大学-足球机器人创新实践基地V5++组
                ICP备案号：<a href="https://beian.miit.gov.cn/">{Global.icp}</a>
            </Typography>
        </Box>
    );
};

export default Footer;
