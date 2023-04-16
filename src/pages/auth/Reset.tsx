import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {post, postWithoutToken} from "../../components/utils/Request";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

function CountDown(props: any) {
    const {mss} = props;

    const [time, setTime] = useState(mss);

    useEffect(() => {
        const tick = setInterval(() => {
            setTime(time - 1);
            localStorage.setItem("v5_timer", time.toString());
        }, 1000);

        console.log("tick", tick);

        return () => clearInterval(tick);
    });

    return (
        <Typography sx={{
            fontSize: 14,
        }}>{time.toString().padStart(2, "0")}</Typography>
    );
}

function ForgetPasswordForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordAgain, setShowPasswordAgain] = useState(false);
    const [sendButtonState, setSendButtonState] = useState(false);
    const [id, setId] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [openBackDrop, setOpenBackDrop] = React.useState(false);

    const handleCloseBackdrop = () => {
        setOpenBackDrop(false);
    };
    const handleToggleBackdrop = () => {
        setOpenBackDrop(true);
    };

    useEffect(() => {
        const timeLeft = Number(localStorage.getItem("v5_timer"))

        if (!isNaN(timeLeft) && timeLeft > 5) {
            setSendButtonState(true);

            setTimeout(function () {
                setSendButtonState(false);
            }, Number(localStorage.getItem("v5_timer")) * 1000)
        }
    }, [])

    const onClickSend = () => {
        handleToggleBackdrop();
        localStorage.setItem("v5_token", "undefined")
        postWithoutToken("/auth/send-code", {
            token: id,
            message: "重置密码验证码",
        }).then(((res: any) => {
            if (res.status === 200) {
                alert("发送成功，请注意查收");
            }
            localStorage.setItem("v5_timer", "60");
            setSendButtonState(true);
            setTimeout(function () {
                setSendButtonState(false);
            }, Number(localStorage.getItem("v5_timer")) * 1000);
            handleCloseBackdrop();
        })).catch(() => {
            alert("发送失败，请注意学号的有效性以及当前网络状态");
            handleCloseBackdrop();
        })
    };

    const navigate = useNavigate();
    const handleClickShowPassword = () =>
        setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    const handleClickShowPasswordAgain = () =>
        setShowPasswordAgain((show) => !show);

    const handleMouseDownPasswordAgain = (event: any) => {
        event.preventDefault();
    };

    const onClickYes = () => {
        handleToggleBackdrop();
        if(password !== passwordAgain){
            alert("两次输入的密码不一致，请检查！");
            handleCloseBackdrop();
            return;
        }
        localStorage.setItem("v5_token", "undefined")
        postWithoutToken("/auth/external-reset-password", {
            id: id,
            password: password,
            code: code,
        }).then(((res: any) => {
            if (res.status === 200) {
                alert("修改成功");
                handleCloseBackdrop();
                navigate('../login');
            }
        })).catch(() => {
            alert("修改失败，请检查网络状态或者验证码是否正确");
            handleCloseBackdrop();
        })
    }

    return (
        <Box
            sx={{
                width: 480,
                height: 500,
                backgroundColor: '#ffffff',
                opacity: 0.85,
                borderRadius: 5,
            }}
        >
            <Stack>
                <Box sx={{
                    marginRight: 2
                }}>
                    <Typography
                        sx={{
                            margin: 3,
                            textAlign: "center",
                            fontFamily: "font5",
                            fontSize: 24,
                        }}
                    >
                        <img src={require("../../assets/imgs/v5logo.png")}
                             style={{
                                 width: 70,
                                 height: 30,
                                 marginRight: 10,
                             }}
                             alt={'v5logo'}>
                        </img>
                        Zone 重置密码
                    </Typography>
                </Box>
                <TextField
                    required
                    id="outlined-required"
                    label="你的学号"
                    sx={{
                        margin: 3,
                        height: 30,
                    }}
                    value={id}
                    onChange={(event) => {
                        setId(event.target.value)
                    }}
                />
                <Box>
                    <TextField
                        required
                        id="outlined-required"
                        label="邮箱验证码"
                        sx={{
                            margin: 3,
                            height: 30,
                            width: 150
                        }}
                        value={code}
                        onChange={(event) => {
                            setCode(event.target.value)
                        }}
                    />
                    {sendButtonState ?
                        <Button
                            sx={{
                                margin: 3,
                                marginTop: 4
                            }}
                            disabled
                            variant="contained"
                            onClick={onClickSend}
                        ><CountDown
                            mss={Number(localStorage.getItem("v5_timer"))}
                        />s后再试</Button>
                        :
                        <Button
                            sx={{
                                margin: 3,
                                marginTop: 4,
                            }}
                            variant="contained"
                            onClick={onClickSend}
                        >发送验证码</Button>
                    }
                </Box>
                <FormControl
                    required={true}
                    sx={{
                        margin: 3,
                        height: 30,
                    }}
                    variant="outlined"
                >

                    <InputLabel
                        htmlFor="outlined-adornment-password"
                    >
                        新密码
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >{showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                        label="新密码"
                    />
                </FormControl>
                <FormControl
                    required={true}
                    sx={{
                        margin: 3,
                        height: 30,
                    }}
                    variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">再次输入密码</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPasswordAgain ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPasswordAgain}
                                    onMouseDown={handleMouseDownPasswordAgain}
                                    edge="end"
                                >{showPasswordAgain ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="再次输入密码"
                        onChange={(event) => {
                            setPasswordAgain(event.target.value)
                        }}
                    />
                </FormControl>
                <Box sx={{textAlign: "center"}}>
                    <Button
                        sx={{
                            margin: 3,
                            textAlign: "center",
                        }}
                        variant="contained"
                        onClick={onClickYes}
                    >确认</Button>
                    <Button
                        sx={{
                            margin: 3,
                            textAlign: "center",
                            fontWeight: "bold",
                        }}
                        variant="outlined"
                        onClick={() => {
                            navigate('../login')
                        }}
                    >返回
                    </Button>
                </Box>
            </Stack>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={openBackDrop}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        </Box>
    );

}

export default ForgetPasswordForm;