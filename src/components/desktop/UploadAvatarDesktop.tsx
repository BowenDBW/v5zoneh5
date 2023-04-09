import React from 'react';
import {useNavigate} from "react-router-dom";
import {post} from "../utils/Request";
import Dialog from "@mui/material/Dialog";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import {deepOrange} from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import GlobalParams from "../../GlobalParams";

export const UploadAvatarDesktop = (props: any) => {

    const {open, setOpen, setMenuClose} = props;
    const navigate = useNavigate();
    const [openBackDrop, setOpenBackDrop] = React.useState(false);
    const [file, setFile] = React.useState<any>(null);
    const [fileLink, setFileLink] = React.useState<any>(null);

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

    function upload(formData: FormData) {
        fetch(GlobalParams.backendUrl + '/album/upload-avatar', {
            method: 'post',
            body: formData,
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                return true;
            }).catch(() => {
            navigate("/auth/login");
        })

        return false;
    }

    function handleResetAvatar() {
        new Promise(function (resolve, reject) {
            handleToggleBackdrop();
            if (file === null) {
                alert("请选择一个文件，再上传！");
                handleCloseBackdrop();
                return;
            }
            let formData = new FormData();
            // @ts-ignore
            formData.append("id", localStorage.getItem("v5_token"));
            formData.append("file", file);
            resolve(upload(formData));
        }).then(function () {
            handleCloseBackdrop();
            handleClose();
            navigate(0);
        });
    }

    const fileInputChange = (event: any) => {
        const newFile = event.target.files[0];
        if (newFile.size >= 1048576 * 10) {
            alert("文件不能大于 10M ");
            return;
        }
        setFile(event.target.files[0]);
        setFileLink(URL.createObjectURL(event.target.files[0]))
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
                <CircularProgress color="inherit"/>
            </Backdrop>
            <DialogTitle
                id="alert-dialog-title"
                sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                }}
            >
                上传新头像
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid xs={2.7}/>
                    <Grid xs={9}>
                        {file === null ?
                            <Avatar
                                alt="Remy Sharp"
                                sx={{
                                    bgcolor: deepOrange[500],
                                    width: 200,
                                    height: 200,
                                }}
                            >
                                暂无上传
                            </Avatar>
                            :
                            <img
                                id="preview"
                                width="200"
                                height="200"
                                style={{borderRadius: 100}}
                                alt="图片"
                                src={fileLink}
                            />
                        }
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{justifyContent: "center"}}>
                <Button
                    variant="outlined"
                    onClick={handleResetAvatar}
                    size="large"
                    sx={{fontWeight: "bold", marginX: 2}}
                >
                    确认
                </Button>
                <Button
                    variant="outlined"
                    component="label"
                    sx={{fontWeight: "bold", marginX: 2}}
                >
                    上传头像 <DriveFolderUploadIcon/>
                    <input
                        hidden accept="image/*"
                        type="file"
                        onChange={fileInputChange}
                    />
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