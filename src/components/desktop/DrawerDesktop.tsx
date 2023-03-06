import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
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
import Global from "../../GlobalParams";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const DrawerDesktop = () => {

    const drawerWidth = "15%";

    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const navigate = useNavigate();

    return (
        <Drawer
            variant="permanent"
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
            <Divider/>
            <br/>
            <Button
                sx={{color: "#a4a4a4"}}
                onClick={handleClickOpen}
            >
                <Typography>
                    ICP信息
                </Typography>
                <HelpOutlineIcon/>
            </Button>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"V5Zone ICP信息"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        sx={{
                            color: "#b0b0b0",
                            textAlign: "center",
                        }}
                        id="alert-dialog-slide-description"
                    >
                        @2003-{new Date().getFullYear()} 西北工业大学-足球机器人创新实践基地V5++组
                    </DialogContentText>
                    <DialogContentText
                        sx={{
                            color: "#b0b0b0",
                            textAlign: "center",
                        }}
                        id="alert-dialog-slide-description"
                    >
                        ICP备案号：<a href="https://beian.miit.gov.cn/">{Global.icp}</a>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        返回
                    </Button>
                </DialogActions>
            </Dialog>
        </Drawer>
    );
};

export default DrawerDesktop;
