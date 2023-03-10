import React from 'react';
import {useNavigate} from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {post} from "../utils/Request";

interface SimpleDialogProps {
    open: boolean,
    setOpen: Function,

    setMenuClose:Function,
}

const ResetPasswordDesktop:React.FC<SimpleDialogProps> = (props) => {

    const {open, setOpen, setMenuClose} = props;
    const navigate = useNavigate();
    const [openBackDrop, setOpenBackDrop] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordAgain, setShowPasswordAgain] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const handleCloseBackdrop = () => {
        setOpenBackDrop(false);
    };
    const handleToggleBackdrop = () => {
        setOpenBackDrop(true);
    };

    function handleClose() {
        setMenuClose();
        setOpen(false);
    }
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event:any) => {
        event.preventDefault();
    };

    const handleClickShowPasswordAgain = () =>
        setShowPasswordAgain((show) => !show);

    const handleMouseDownPasswordAgain = (event:any) => {
        event.preventDefault();
    };
    const onClickReset = () => {
        handleToggleBackdrop();
        if (password === "") {
            alert("密码不能为空！");
            handleCloseBackdrop();
            return;
        }
        if (password !== password2) {
            alert("两次输入的密码不同！");
            handleCloseBackdrop();
            return;
        }
        post("/auth/internal-reset-password", {
            "id": localStorage.getItem("v5_token"),
            "password": password
        }).then((res:any) => {
            if (res.status === 200) {
                localStorage.setItem('v5_token', "")
                localStorage.setItem('v5_id', "")
                alert("更改成功！请重新登录")
                navigate("/auth/login");
            } else {
                alert("更新失败，请检查网络");
            }
        });
        handleCloseBackdrop();
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={openBackDrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <DialogTitle
                id="alert-dialog-title"
                sx={{
                    fontWeight:"bold",
                    textAlign:"center",
                }}
            >
                重置密码
            </DialogTitle>
            <DialogContent sx={{textAlign:"center"}}>
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
                            setPassword2(event.target.value)
                        }}
                    />
                </FormControl>
            </DialogContent>
            <DialogActions sx={{justifyContent:"center"}}>
                <Button
                    variant="contained"
                    onClick={onClickReset}
                    size="large"
                    sx={{fontWeight: "bold", marginX: 2}}
                >
                    确认修改
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleClose}
                    size="large"
                    sx={{fontWeight: "bold", marginX: 2}}
                >
                    返回
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ResetPasswordDesktop;