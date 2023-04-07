import React, {useState} from 'react';
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import {post} from "./utils/Request";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

function Invite() {

    const [email, setEmail] = useState("");
    const [openBackDrop, setOpenBackDrop] = React.useState(false);

    const handleCloseBackdrop = () => {
        setOpenBackDrop(false);
    };
    const handleToggleBackdrop = () => {
        setOpenBackDrop(true);
    };

    const onClickYes = () => {
        handleToggleBackdrop();
        if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)) {
            alert("邮箱格式有误，应为 xxx@xx.com");
            handleCloseBackdrop();
            return;
        }
        post("/auth/send-invite-code", {
            token: email,
            message: "重置密码验证码",
        }).then(((res: any) => {
            if (res.status === 200) {
                alert("发送成功");
                handleCloseBackdrop();
            }
        })).catch(() => {
            alert("发送失败，请注意当前网络状态");
            handleCloseBackdrop();
        })
    }

    return (
        <Box>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={openBackDrop}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Typography
                sx={{
                    margin: 3,
                    fontFamily: "黑体",
                    fontWeight: "bold",
                    fontSize: 20,
                }}
            >
                新队员注册邀请码生成器
            </Typography>
            <Grid container spacing={1}>
                <Grid xs={1}></Grid>
                <Grid xs={10}>
                    <TextField
                        required
                        id="outlined-required"
                        label="新队员邮箱"
                        sx={{
                            margin: 3,
                            height: 30,
                        }}
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value)
                        }}
                    />
                    <Button
                        sx={{
                            marginTop: 4,
                            textAlign: "center",
                        }}
                        variant="contained"
                        onClick={onClickYes}
                    >发送邀请码</Button>
                </Grid>
                <Grid xs={1}></Grid>
            </Grid>
        </Box>

    );

}

export default Invite;
