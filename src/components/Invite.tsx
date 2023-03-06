import React, {useState} from 'react';
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import {post} from "./utils/Request";

function Invite() {

    const [email, setEmail] = useState("")

    const onClickYes = () => {
        if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)) {
            alert("邮箱格式有误，应为 xxx@xx.com");
            return;
        }
        post("/auth/send_invite_code", {
            id: email,
            message: "重置密码验证码",
        }).then(((res:any) => {
            if (res.status === 200) {
                alert("发送成功");
            }
        })).catch(() => {
            alert("发送失败，请注意当前网络状态");
        })
    }

    return (
        <Box>
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
