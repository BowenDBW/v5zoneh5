import {Box, Divider, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from "@mui/material";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LockResetIcon from "@mui/icons-material/LockReset";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import React from "react";
import {useNavigate} from "react-router-dom";
import ProfileDesktop from "./desktop/ProfileDesktop";
import ProfileMobile from "./mobile/ProfileMobile";
import {ResetPasswordMobile} from "./mobile/ResetPasswordMobile";
import ResetPasswordDesktop from "./desktop/ResetPasswordDesktop";
import {post} from "./utils/Request";
import {UploadAvatarDesktop} from "./desktop/UploadAvatarDesktop";
import {UploadAvatarMobile} from "./mobile/UploadAvatarMobile";
import Global from "../GlobalParams";
import BoundToOauth from "./desktop/BoundToOauth";

interface HeaderProps {
    setAnchorEl: Function,
    anchorEl: any,
    open: boolean,
}

export const HeaderMenu: React.FC<HeaderProps> = (props) => {

    const [profileDesktop, setProfileDesktop] = React.useState(false);
    const [passwordDesktop, setPasswordDesktop] = React.useState(false);
    const [uploadAvatar, setUploadAvatarDesktop] = React.useState(false);
    const [boundGitlab, setBoundGitlab] = React.useState(false);
    const [isMonitor, setIsMonitor] = React.useState("COMMON");
    const [hasBoundWithGitlab, setHasBoundWithGitlab] = React.useState(false);
    const {open, anchorEl, setAnchorEl} = props;
    const navigate = useNavigate();


    const init = () => {
        post("/auth/is-monitor", localStorage.getItem("v5_token"))
            .then((res: any) => {
                setIsMonitor(res.data);
            })
        post("/auth/has-bounded-gitlab", localStorage.getItem("v5_token"))
            .then((res: any) => {
                if(res.data.msg === "true"){
                    setHasBoundWithGitlab(true);
                }else {
                    setHasBoundWithGitlab(false);
                }
            })
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogout = () => {
        localStorage.setItem("v5_token","null");
        navigate("/");
    }

    const onViewProfile = () => {
        if (Global.isDesktop) {
            setProfileDesktop(true);
        } else {
            navigate("/homepage/profile");
        }
    }

    const onSetAvatar = () => {
        if (Global.isDesktop) {
            setUploadAvatarDesktop(true);
        } else {
            navigate("/homepage/set-avatar");
        }
    }

    const onBound = () => {
        if (Global.isDesktop) {
            setBoundGitlab(true);
        }
    }

    const onResetPassword = () => {
        if (Global.isDesktop) {
            setPasswordDesktop(true);
        } else {
            navigate("/homepage/reset-password");
        }
    }

    const onManage = () => {
        setAnchorEl(null);
        navigate("/homepage/manage");
    }

    React.useEffect(() => {
        init();
    }, [])

    return (
        <Box>
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
                    {Global.isDesktop ?
                        <MenuItem onClick={onBound}>
                            <ListItemIcon>
                                <ConnectWithoutContactIcon fontSize="small"/>
                            </ListItemIcon>
                            <ListItemText>
                                {hasBoundWithGitlab ? "解绑":"绑定"}Gitlab
                            </ListItemText>
                        </MenuItem>
                        :
                        <div/>
                    }
                    {isMonitor === "COMMON" ?
                        <div/>
                        :
                        <MenuItem onClick={onManage}>
                            <ListItemIcon>
                                <ManageAccountsIcon fontSize="small"/>
                            </ListItemIcon>
                            <ListItemText>管理员界面</ListItemText>
                        </MenuItem>
                    }
                    <Divider/>
                    <MenuItem onClick={onLogout}>
                        <ListItemIcon>
                            <LogoutIcon color="error" fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText color="error">退出登录</ListItemText>
                    </MenuItem>
                </MenuList>
            </Menu>
            {
                Global.isDesktop ?
                    <ProfileDesktop
                        open={profileDesktop}
                        setOpen={setProfileDesktop}
                        setMenuClose={handleClose}
                    />
                    :
                    <ProfileMobile/>
            }
            {
                Global.isDesktop ?
                    <ResetPasswordDesktop
                        open={passwordDesktop}
                        setOpen={setPasswordDesktop}
                        setMenuClose={handleClose}
                    />
                    :
                    <ResetPasswordMobile/>
            }
            {
                Global.isDesktop ?
                    <UploadAvatarDesktop
                        open={uploadAvatar}
                        setOpen={setUploadAvatarDesktop}
                        setMenuClose={handleClose}
                    />
                    :
                    <UploadAvatarMobile/>
            }

            <BoundToOauth
                open={boundGitlab}
                setOpen={setBoundGitlab}
                setMenuClose={handleClose}
                init={init}
            />
        </Box>
    );
};
