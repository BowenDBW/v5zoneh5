import React from 'react';
import {Avatar, Box, Button, Divider, Toolbar, Typography,} from "@mui/material";
import {deepOrange} from '@mui/material/colors';
import {HeaderMenu} from "../HeaderMenu";
import {GetTimeState} from "../utils/GetTimeState";

const HeaderDesktop = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const getTimeState = GetTimeState()

    // @ts-ignore
    return (
        <Box
            sx={{
                flexGrow: 1,
                top: 0,
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
                            marginX: 1,
                            fontSize: 18,
                            color: "#000000",
                        }}
                    >
                        {getTimeState}! 邓博文
                    </Typography>
                    <Avatar sx={{bgcolor: deepOrange[500]}}>邓</Avatar>
                </Button>
            </Toolbar>
            <Divider/>
            <HeaderMenu open={open} anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>
        </Box>
    );
};

export default HeaderDesktop;
