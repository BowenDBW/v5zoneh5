import React from 'react';
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import {post} from "../utils/Request";
import Global from "../../GlobalParams";

interface SimpleDialogProps {
    open: boolean,
    setOpen: Function,
    setMenuClose: Function,
    init: Function,
}

const BoundToOauth: React.FC<SimpleDialogProps> = (props) => {

    const {open, setOpen, setMenuClose, init} = props;
    const [hasBoundWithGitlab, setHasBoundWithGitlab] = React.useState(false);

    React.useEffect(()=>{
        post("/auth/has-bounded-gitlab", localStorage.getItem("v5_token"))
            .then((res: any) => {
                if(res.data.msg === "true"){
                    setHasBoundWithGitlab(true);
                }
            })
    },[])
    function handleClose() {
        setMenuClose();
        setOpen(false);
    }

    const onClickReset = () => {
        if(!hasBoundWithGitlab){
            window.location.href = Global.oauthUrl +
                "/oauth/authorize?client_id=" +
                Global.oauthId +
                "&redirect_uri=" +
                Global.oauthRedirectUrl +
                "/callback2" +
                "&response_type=" +
                "code" +
                "&scope=" +
                "read_user+openid" +
                "&code_challenge_method=" +
                "S256";
        }else {
            post("/auth/untie-gitlab", localStorage.getItem("v5_token"))
                .then((res: any) => {
                    if(res.data.msg === "true"){
                        setHasBoundWithGitlab(!hasBoundWithGitlab);
                        init();
                        alert("解绑成功");
                        handleClose();
                    }else {
                        alert("解绑失败");
                        handleClose();
                    }
                })
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle
                id="alert-dialog-title"
                sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                }}
            >
                {hasBoundWithGitlab ? "解绑":"绑定"}Gitlab账号
            </DialogTitle>
            <DialogContent sx={{textAlign: "center"}}>
            </DialogContent>
            <DialogActions sx={{justifyContent: "center"}}>
                <Button
                    variant="contained"
                    onClick={onClickReset}
                    size="large"
                    sx={{fontWeight: "bold", marginX: 2}}
                >
                    {hasBoundWithGitlab ? "确认解绑":"现在绑定"}
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

export default BoundToOauth;