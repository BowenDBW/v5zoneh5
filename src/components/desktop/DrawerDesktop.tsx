import React from 'react';
import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from "@mui/material";
import TaskIcon from '@mui/icons-material/Task';
import PhoneIcon from '@mui/icons-material/Phone';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ChatIcon from '@mui/icons-material/Chat';
import CollectionsIcon from '@mui/icons-material/Collections';
import GitHubIcon from '@mui/icons-material/GitHub';
import StorageIcon from '@mui/icons-material/Storage';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CoffeeIcon from '@mui/icons-material/Coffee';
import {useNavigate} from "react-router-dom";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const DrawerDesktop = () => {

    const drawerWidth = "13%";

    const navigate = useNavigate();

    return (
        <Drawer
            variant = "permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            anchor="left"
        >
            <Toolbar
                sx={{
                    margin: 1,
                    height: 100,
                }}
            >
                <img
                    src={require('../../assets/v5logo.png')}
                    alt={"v5_logo"}
                />
            </Toolbar>
            <List>
                <Divider/>
                <ListItem key={'V5 Gitlab'} disablePadding>
                    <ListItemButton
                        onClick={() => {
                            window.location.href = "https://git.npu5v5.cn"
                        }}
                    >
                        <ListItemIcon>
                            <GitHubIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"V5 Gitlab"}/>
                    </ListItemButton>
                </ListItem>
                <ListItem key={'V5 Gitea'} disablePadding>
                    <ListItemButton
                        onClick={() => {
                            window.location.href = "https://gitea.npu5v5.cn"
                        }}
                    >
                        <ListItemIcon>
                            <CoffeeIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"V5 Gitea"}/>
                    </ListItemButton>
                </ListItem>
                <ListItem key={'V5 网盘'} disablePadding>
                    <ListItemButton
                        onClick={() => {
                            window.location.href = "https://seafile.npu5v5.cn"
                        }}
                    >
                        <ListItemIcon>
                            <StorageIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"V5 网盘"}/>
                    </ListItemButton>
                </ListItem>
                <ListItem key={'V5 博客'} disablePadding>
                    <ListItemButton
                        onClick={() => {
                            window.location.href = "https://docs.npu5v5.cn"
                        }}
                    >
                        <ListItemIcon>
                            <CoPresentIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"V5 博客"}/>
                    </ListItemButton>
                </ListItem>
                <ListItem key={'V5 学习资料'} disablePadding>
                    <ListItemButton
                        onClick={() => {
                            window.location.href = "https://files.npu5v5.cn"
                        }}
                    >
                        <ListItemIcon>
                            <CloudDownloadIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"V5 学习资料"}/>
                    </ListItemButton>
                </ListItem>
                <Divider/>
                <ListItem key={'公告栏'} disablePadding>
                    <ListItemButton
                        onClick={() => {
                            navigate('/homepage/');
                        }}
                    >
                        <ListItemIcon>
                            <TaskIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"公告栏"}/>
                    </ListItemButton>
                </ListItem>
                <ListItem key={'我的奖状'} disablePadding>
                    <ListItemButton
                        onClick={() => {
                            navigate('/homepage/prize');
                        }}
                    >
                        <ListItemIcon>
                            <EmojiEventsIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"我的奖状"}/>
                    </ListItemButton>
                </ListItem>
                <ListItem key={'经费报销'} disablePadding>
                    <ListItemButton
                        onClick={() => {
                            navigate('/homepage/budget');
                        }}
                    >
                        <ListItemIcon>
                            {<MonetizationOnIcon/>
                            }
                        </ListItemIcon>
                        <ListItemText primary={"经费报销"}/>
                    </ListItemButton>
                </ListItem>
                <ListItem key={'组员联系方式'} disablePadding>
                    <ListItemButton
                        onClick={() => {
                            navigate('/homepage/contact');
                        }}
                    >
                        <ListItemIcon>
                            {<PhoneIcon/>
                            }
                        </ListItemIcon>
                        <ListItemText primary={"组员联系方式"}/>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem key={'V5留言板'} disablePadding>
                    <ListItemButton
                        onClick={() => {
                            navigate('/homepage/message-board');
                        }}
                    >
                        <ListItemIcon>
                            <ChatIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"V5留言板"}/>
                    </ListItemButton>
                </ListItem>
                <ListItem key={'V5照片墙'} disablePadding>
                    <ListItemButton
                        onClick={() => {
                            navigate('/homepage/image-board');
                        }}
                    >
                        <ListItemIcon>
                            <CollectionsIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"V5照片墙"}/>
                    </ListItemButton>
                </ListItem>
                <ListItem key={'我的图床'} disablePadding>
                    <ListItemButton
                        onClick={() => {
                            navigate('/homepage/image-bad');
                        }}
                    >
                        <ListItemIcon>
                            <AddPhotoAlternateIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"我的图床"}/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default DrawerDesktop;
