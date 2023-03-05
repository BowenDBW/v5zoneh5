import React, {useState} from 'react';
import {
    Box,
    AppBar,
    IconButton,
    Typography,
    Toolbar, Avatar, Button,

} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import DrawerMobile from "./DrawerMobile";
import {deepOrange} from "@mui/material/colors";
import {HeaderMenu} from "../HeaderMenu";


const HeaderMobile = () => {

    const [openDrawer, setOpenDrawer] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <Box sx={{flexGrow: 1}}>
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
                    <img src={require("../../assets/v5logo.png")}
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
                    <Avatar sx={{bgcolor: deepOrange[500]}}>邓</Avatar>
                </Button>
            </AppBar>
            <HeaderMenu open={openMenu} anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>
        </Box>
    );
};

export default HeaderMobile;
