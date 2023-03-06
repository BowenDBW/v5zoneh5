import {Divider, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from "@mui/material";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LockResetIcon from "@mui/icons-material/LockReset";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import {useNavigate} from "react-router-dom";

interface HeaderProps {
    setAnchorEl: Function,
    anchorEl: any,
    open: boolean,
}

export const HeaderMenu: React.FC<HeaderProps> = (props) => {

    const {open, anchorEl, setAnchorEl} = props;

    const navigate = useNavigate();

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogout = () => {
        navigate("/auth/login");
    }

    const onViewProfile = () => {

    }

    const onSetAvatar = () => {

    }

    const onResetPassword = () => {

    }

    return (
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
                <MenuItem onClick={onSetAvatar}>
                    <ListItemIcon>
                        <CenterFocusWeakIcon fontSize="small"/>
                    </ListItemIcon>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <ListItemText>
                        更改头像&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={onViewProfile}>
                    <ListItemIcon>
                        <AccountBoxIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>个人资料</ListItemText>
                </MenuItem>
                <MenuItem onClick={onResetPassword}>
                    <ListItemIcon>
                        <LockResetIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>重置密码</ListItemText>
                </MenuItem>
                <Divider/>
                <MenuItem onClick={onLogout}>
                    <ListItemIcon>
                        <LogoutIcon sx={{color: "#ea7373"}} fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText sx={{color: "#ea7373"}}>退出登录</ListItemText>
                </MenuItem>
            </MenuList>
        </Menu>
    );
};
