import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useNavigate} from "react-router-dom/";
import React from "react";
import {post} from "../../components/utils/Request"
import Global from "../../GlobalParams";

function Login() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [usernameInvalid, setUsernameInvalid] = React.useState(false);
    const [passwordInvalid, setPasswordInvalid] = React.useState(false);
    const [openBackDrop, setOpenBackDrop] = React.useState(false);

    const handleCloseBackdrop = () => {
        setOpenBackDrop(false);
    };
    const handleToggleBackdrop = () => {
        setOpenBackDrop(true);
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

    const onOauth = () => {
        window.location.href = Global.oauthUrl +
            "/oauth/authorize?client_id=" +
            Global.oauthId +
            "&redirect_uri=" +
            Global.oauthRedirectUrl +
            "/auth/callback" +
            "&response_type=" +
            "code" +
            "&scope=" +
            "read_user+openid" +
            "&code_challenge_method=" +
            "S256";
    }

    const onClickLogin = () => {
        handleToggleBackdrop();
        localStorage.setItem("v5_token", "undefined");
        post("/auth/authenticate", {"id": username, "password": password})
            .then(((res: any) => {
            if (res.status === 200) {
                localStorage.setItem('v5_token', res.data.token);
                localStorage.setItem('v5_id', res.data.id);
                localStorage.setItem('v5_contact_tech', "全部");
                localStorage.setItem('v5_contact_college', "全部");
                localStorage.setItem('v5_contact_session', "现役");
                navigate("/homepage/check-board");
            }
        })).catch(() => {
            alert("用户名或密码错误！");
            handleCloseBackdrop();
        })
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
                <Grid
                    sx={{
                        marginRight: 2,
                    }}
                    container
                >
                    <Grid xs={2.8}>
                        <Button
                            sx={{
                                margin: 2,
                                textAlign: "left",
                                fontFamily: "font5",
                                fontSize: 18,
                            }}
                            startIcon={<ArrowBackIosIcon/>}
                            onClick={() => {
                                navigate("/welcome")
                            }}
                        >
                            返回
                        </Button>
                    </Grid>
                    <Grid xs={6.4}>
                        <Typography
                            sx={{
                                margin: 3,
                                textAlign: "center",
                                fontFamily: "font5",
                                fontSize: 26,
                            }}
                        >
                            <img src={require("../../assets/imgs/v5logo-short.png")}
                                 style={{
                                     width: 30,
                                     height: 30,
                                     marginRight: 10,
                                 }}
                                 alt={'v5logo'}>
                            </img>
                            V5 Zone 登录
                        </Typography>
                    </Grid>
                    <Grid xs={2.8}/>
                </Grid>
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
                    sx={{justifyContent: "center"}}
                >
                    {Global.isDesktop ?
                        <Grid>
                            <Button
                                sx={{
                                    fontFamily: "font5",
                                    fontSize: 16,
                                }}
                                variant="text"
                                onClick={() => {
                                    if (Global.isDesktop) {
                                        navigate('../registry')
                                    } else return (
                                        alert("该功能仅限桌面端")
                                    )
                                }}
                            >是新队员？</Button>
                        </Grid>
                        :
                        <div/>
                    }
                    <Grid>
                        <Button
                            sx={{
                                fontFamily: "font5",
                                fontSize: 16,
                                marginLeft: 6,
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
                            width: Global.isDesktop ? 120 : 100,
                        }}
                        variant="contained"
                        onClick={onClickLogin}
                    >登录</Button>
                    <Button
                        sx={{
                            margin: 3,
                            textAlign: "center",
                            width: Global.isDesktop ? 120 : 100,
                            fontWeight: "bold",
                        }}
                        color={"secondary"}
                        variant="outlined"
                        onClick={onOauth}
                    >单点登录</Button>
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
};

export default Login;
