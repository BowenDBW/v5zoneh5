import React, {useEffect} from 'react';
import {Avatar, Box, Button, Divider, Toolbar, Typography,} from "@mui/material";
import {deepOrange} from '@mui/material/colors';
import {HeaderMenu} from "../HeaderMenu";
import {GetTimeState} from "../utils/GetTimeState";
import {post} from "../utils/Request"
import {useNavigate} from "react-router-dom";

const HeaderDesktop = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [name, setName] = React.useState<string>("");
    const [avatar, setAvatar] = React.useState<string>("");
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
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

    const getTimeState = GetTimeState()

    return (
        <Box
            sx={{
                flexGrow: 1,
                top: 0,
                width: "100%",
                position: "sticky",
                backgroundColor: "#FFF",
                zIndex: 10,
            }}
        >
            <Toolbar sx={{height: 80}}>
                <Typography
                    variant="h6"
                    sx={{
                        color: "#000000",
                        fontSize: 36,
                        position: "absolute",
                        marginLeft: 5,
                        left: 20,
                        fontFamily:"font2",
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
                            fontSize: 22,
                            color: "#000000",
                            fontFamily:"font5"
                        }}
                    >
                        {getTimeState}! {name}
                    </Typography>
                    {avatar === "" ?
                        <Avatar sx={{bgcolor: deepOrange[500]}}>{name[0]}</Avatar>
                        :
                        <Avatar sx={{color:"#000000",borderStyle:"solid", borderWidth:"1px"}} src={avatar}/>
                    }
                </Button>
            </Toolbar>
            <Divider/>
            <HeaderMenu open={open} anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>
        </Box>
    );
};

export default HeaderDesktop;
