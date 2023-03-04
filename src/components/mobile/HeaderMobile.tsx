import React from 'react';
import {
    Box,
    AppBar,
    IconButton,
    Typography,
    Toolbar,

} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


const HeaderMobile = () => {
    return (
        <Box sx={{flexGrow: 1}}>
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

                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <img src={require("../assets/v5logo.png")}
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
                    <IconButton
                        sx={{
                            position: "absolute",
                            right: 20
                        }}
                    >
                        <SettingsIcon/>
                    </IconButton>
                    <IconButton
                        sx={{
                            position: "absolute",
                            right: 60
                        }}
                    >
                        <AddPhotoAlternateIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default HeaderMobile;
