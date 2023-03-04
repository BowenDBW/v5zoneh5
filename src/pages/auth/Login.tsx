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
    Typography
} from "@mui/material";

import {
    Visibility,
    VisibilityOff
} from "@mui/icons-material";

import React from "react";
import {useNavigate} from "react-router-dom";
import {IsDesktop} from "../../components/utils/IsDesktop";
import {post} from "../../components/utils/Request";


function Login(){
    const [showPassword, setShowPassword] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [usernameInvalid, setUsernameInvalid] = React.useState(false);
    const [passwordInvalid, setPasswordInvalid] = React.useState(false);

    const navigate = useNavigate()
    const isDesktop = IsDesktop()

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value);
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onClickLogin = () => {
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
    }

    return (
        <Box
            sx={{
                width: 480 > window.innerWidth ? 0.8 * window.innerWidth : 480,
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
                    label={usernameInvalid ? "用户名不存在，请检查":"学号"}
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
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        error = {passwordInvalid}
                        label ={passwordInvalid ? "密码有误，请重新输入":"密码"}
                        value = {password}
                        onChange={handlePasswordChange}
                    />
                </FormControl>
                <Grid
                    container spacing={2}
                    sx={{
                        marginLeft: 4,
                    }}
                >
                    <Grid xs={4}>
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
                <Box sx={{textAlign: "center"}}>
                    <Button
                        sx={{
                            margin: 3,
                            textAlign: "center",
                            width: 120,
                        }}
                        variant="contained"
                        onClick={onClickLogin}
                    >登录</Button>
                    <Button
                        sx={{
                            margin: 3,
                            textAlign: "center",
                            width: 120,
                            fontWeight: "bold",
                        }}
                        disabled={true}
                        variant="outlined"
                        onClick={onClickLogin}
                    >Gitlab登录</Button>
                </Box>
            </Stack>
        </Box>
    );
};

export default Login;
