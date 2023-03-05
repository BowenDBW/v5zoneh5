import React from 'react';
import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Button, Typography, DialogTitle, DialogContent, Dialog, DialogContentText, DialogActions, Box
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import CoffeeIcon from "@mui/icons-material/Coffee";
import StorageIcon from "@mui/icons-material/Storage";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import TaskIcon from "@mui/icons-material/Task";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import ChatIcon from "@mui/icons-material/Chat";
import CollectionsIcon from "@mui/icons-material/Collections";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {useNavigate} from "react-router-dom";
import Global from "../../GlobalParams";

interface DrawerInterface {
    open: boolean,
    setOpen: Function,
}

const DrawerMobile: React.FC<DrawerInterface> = (props) => {
    const {open, setOpen} = props;

    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const drawerWidth = "50%";

    const navigate = useNavigate();

    return (
        <Box>
            <Drawer
                variant="persistent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                anchor="left"
                open={open}
            >
                <List>
                    <ListItem key={'返回'} disablePadding>
                        <ListItemButton
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <ListItemIcon>
                                <ArrowBackIcon/>
                            </ListItemIcon>
                            <ListItemText primary={"返回"}/>
                        </ListItemButton>
                    </ListItem>
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
                                setOpen(false);
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
                                setOpen(false);
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
                                setOpen(false);
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
                                setOpen(false);
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
                                setOpen(false);
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
                                setOpen(false);
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
                                setOpen(false);
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
                    sx={{color:"#a4a4a4"}}
                    onClick={handleClickOpen}
                >
                    <Typography>
                        ICP信息
                    </Typography>
                    <HelpOutlineIcon/>
                </Button>
            </Drawer>
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
                            color:"#b0b0b0",
                            textAlign: "center",
                        }}
                        id="alert-dialog-slide-description"
                    >
                        @2003-{new Date().getFullYear()} 西北工业大学-足球机器人创新实践基地V5++组
                    </DialogContentText>
                    <DialogContentText
                        sx={{
                            color:"#b0b0b0",
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
        </Box>
    );
};

export default DrawerMobile;
