import React, {useEffect, useState} from 'react';
import {AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography,} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import DrawerMobile from "./DrawerMobile";
import {deepOrange} from "@mui/material/colors";
import {HeaderMenu} from "../HeaderMenu";
import {post} from "../utils/Request";
import {useNavigate} from "react-router-dom";

const HeaderMobile = () => {
    const navigate = useNavigate();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [name, setName] = React.useState<string>("");
    const [avatar, setAvatar] = React.useState<string>("");
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    useEffect(()=>{
        post("/member/name",
            localStorage.getItem("v5_token")).then((res:any) => {
                setName(res.data.msg);
            }
        ).catch(() => {
            alert("登录信息过期，请重新登录");
            navigate("/auth/login");
        });
    },[])

    return (
        <Box sx={{flexGrow: 1, zIndex: 10,}}>
            <DrawerMobile open={openDrawer} setOpen={setOpenDrawer}/>
            <AppBar position="static">
                <Toolbar
                    sx={{
                        backgroundColor: '#FFFFFF',
                    }}
                >
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{mr: 2}}
                        onClick={() => {
                            setOpenDrawer(true);
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <img src={require("../../assets/imgs/v5logo.png")}
                         style={{
                             width: 70,
                             height: 30,
                             marginRight: 10,
                         }}
                         alt={'v5logo'}>
                    </img>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            color: "#000000"
                        }}>
                        V5 Zone
                    </Typography>
                </Toolbar>
                <Button
                    sx={{
                        position: "absolute",
                        right: 12,
                        marginTop: 0.2,
                    }}
                    id='basic-button'
                    aria-controls={openDrawer ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openDrawer ? 'true' : undefined}
                    onClick={handleClick}
                    variant="text"
                >
                    {avatar === "" ?
                        <Avatar sx={{bgcolor: deepOrange[500]}}>{name[0]}</Avatar>
                        :
                        <Avatar sx={{color:"#000000",borderStyle:"solid", borderWidth:"1px"}} src={avatar}/>
                    }
                </Button>
            </AppBar>
            <HeaderMenu open={openMenu} anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>
        </Box>
    );
};

export default HeaderMobile;
