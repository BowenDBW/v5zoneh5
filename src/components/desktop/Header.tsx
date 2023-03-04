import React from 'react';
import {
    Toolbar,
    Box,
    Typography,
    Button,
    Divider, MenuItem, Menu, MenuList, ListItemIcon, ListItemText, Avatar,
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LockResetIcon from '@mui/icons-material/LockReset';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import {deepOrange} from '@mui/material/colors';

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    let getTimeState = () => {
        // 获取当前时间
        let timeNow = new Date();
        // 获取当前小时
        let hours = timeNow.getHours();
        // 设置默认文字
        let text = ``;
        // 判断当前时间段
        if (hours >= 0 && hours <= 10) {
            text = `早上好`;
        } else if (hours > 10 && hours <= 14) {
            text = `中午好`;
        } else if (hours > 14 && hours <= 18) {
            text = `下午好`;
        } else if (hours > 18 && hours <= 24) {
            text = `晚上好`;
        }
        console.log(`hours >>>>>`, hours);
        console.log(`text >>>>`, text);
        // 返回当前时间段对应的状态
        return text;
    };

    // @ts-ignore
    return (
        <Box
            sx={{
                flexGrow: 1,
                top:0,
                width: "100%",

            }}
        >
            <Toolbar sx={{height: 80,}}>
                <Typography
                    variant="h6"
                    sx={{
                        color: "#000000",
                        fontSize: 25,
                        position: "absolute",
                        marginLeft: 5,
                        left: 20,
                    }}
                >
                    V5++ 无以复加
                </Typography>
                <Button
                    sx={{
                        position: "absolute",
                        right: 20,
                    }}
                    id='basic-button'
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    variant="text"
                >
                    <Typography
                        sx={{
                            marginX: 2,
                            fontSize: 18,
                            color: "#000000",
                        }}
                    >
                        {getTimeState()}! 邓博文
                    </Typography>
                    <Avatar sx={{bgcolor: deepOrange[500]}}>邓</Avatar>
                </Button>
            </Toolbar>
            <Divider/>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuList>
                    <MenuItem>
                        <ListItemIcon>
                            <CenterFocusWeakIcon fontSize="small" />
                        </ListItemIcon>
                        {/* eslint-disable-next-line react/jsx-no-undef */}
                        <ListItemText>
                            更改头像&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </ListItemText>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <AccountBoxIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>个人资料</ListItemText>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <LockResetIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>重置密码</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <LogoutIcon sx={{color:"#ea7373"}} fontSize="small" />
                        </ListItemIcon>
                        <ListItemText sx={{color:"#ea7373"}}>退出登录</ListItemText>
                    </MenuItem>
                </MenuList>
            </Menu>
        </Box>
    );
};

export default Header;
