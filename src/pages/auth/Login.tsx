import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    TextField,
    Typography,
    CircularProgress,
    Backdrop
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {IsDesktop} from "../../components/utils/IsDesktop";
import React from "react";

// https://github.com/caijf/rc-slider-captcha
import SliderCaptcha from "rc-slider-captcha";

function Login() {

    const [showPassword, setShowPassword] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [usernameInvalid, setUsernameInvalid] = React.useState(false);
    const [passwordInvalid, setPasswordInvalid] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const navigate = useNavigate();
    const isDesktop = IsDesktop();

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(true);
    };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setUsername(event.target.value);
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(event.target.value);

    const handleClickShowPassword = () =>
        setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onClickLogin = () => {
        handleToggle();

        const data = {
            "id": username,
            "password": password
        }
        // localStorage.setItem("v5_token", "undefined");
        //
        // post("/auth/authenticate", data).then(((res:any) => {
        //     if (res.status === 200) {
        //         localStorage.setItem('v5_token', res.data.token);
        //         console.log(res.data.token);
        //         localStorage.setItem('v5_id', res.data.id);
        //         console.log(res.data.id);
        //         localStorage.setItem('v5_contact_tech', "全部");
        //         localStorage.setItem('v5_contact_college', "全部");
        //         localStorage.setItem('v5_contact_session', "现役");
        navigate("/homepage");
        //     }
        // })).catch(() => {
        //     alert("用户名或密码错误！")
        // })

        handleClose();
    }

    return (
        <Box
            sx={{
                width: 480 > window.innerWidth ? 0.83 * window.innerWidth : 480,
                height: 400,
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
                            fontFamily: "黑体",
                            fontWeight: "bold",
                            fontSize: 24,
                        }}
                    >
                        <img src={require("../../assets/v5logo.png")}
                             style={{
                                 width: 70,
                                 height: 30,
                                 marginRight: 10,
                             }}
                             alt={'v5logo'}>
                        </img>
                        V5 Zone 登录
                    </Typography>
                </Box>
                <TextField
                    required
                    id="outlined-required"
                    label={usernameInvalid ? "用户名不存在，请检查" : "学号"}
                    sx={{
                        margin: 3,
                        height: 40
                    }}
                    error={usernameInvalid}
                    value={username}
                    onChange={handleUsernameChange}
                />
                <FormControl
                    required={true}
                    sx={{
                        margin: 3,
                    }}
                    variant="outlined"
                >
                    <InputLabel htmlFor="outlined-adornment-password">密码</InputLabel>
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
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        error={passwordInvalid}
                        label={passwordInvalid ? "密码有误，请重新输入" : "密码"}
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </FormControl>
                <Grid
                    container spacing={2}
                    sx={{
                        marginLeft: 4,
                        justifyContent: "left",
                    }}
                >
                    <Grid>
                        <FormControlLabel
                            control={<Checkbox defaultChecked/>}
                            label="记住我"
                            sx={{
                                marginX: 1,
                                marginTop: 1,
                                height: 18,
                            }}
                        />
                    </Grid>
                    {isDesktop ?
                        <Grid>
                            <Button
                                sx={{
                                    fontWeight: "bold",
                                    font: 18,
                                }}
                                variant="text"
                                onClick={() => {
                                    if (isDesktop) {
                                        navigate('../registry')
                                    } else return (
                                        alert("该功能仅限桌面端")
                                    )
                                }}
                            >是新队员？</Button>
                        </Grid>
                        :
                        <Grid xs={2}/>
                    }
                    <Grid>
                        <Button
                            sx={{
                                fontWeight: "bold",
                                font: 18,
                            }}
                            variant="text"
                            onClick={() => {
                                navigate('../reset')
                            }}
                        >
                            忘记密码？
                        </Button>
                    </Grid>
                </Grid>
                <SliderCaptcha
                    request={async () => {
                        return {
                            bgUrl: 'background image url',
                            puzzleUrl: 'puzzle image url'
                        };
                    }}
                    onVerify={async (data) => {
                        console.log(data);
                        // verify data
                        return Promise.resolve();
                    }}
                />
                <Box sx={{textAlign: "center"}}>
                    <Button
                        sx={{
                            margin: 3,
                            textAlign: "center",
                            width: isDesktop ? 120 : 100,
                        }}
                        variant="contained"
                        onClick={onClickLogin}
                    >登录</Button>
                    <Button
                        sx={{
                            margin: 3,
                            textAlign: "center",
                            width: isDesktop ? 120 : 100,
                            fontWeight: "bold",
                        }}
                        disabled={true}
                        variant="outlined"
                        onClick={onClickLogin}
                    >{isDesktop ? "Gitlab登录" : "单点登录"}</Button>
                </Box>
            </Stack>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
};

export default Login;
