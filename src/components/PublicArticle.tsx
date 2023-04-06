import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {post} from "./utils/Request";
import Global from "../GlobalParams";
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid,
    MenuItem, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField, Typography
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

const MarkdownTable = () => {

    const [renderRows, setRenderRows] = useState([]);
    const [openBackDrop, setOpenBackDrop] = React.useState(false);

    const handleCloseBackdrop = () => {
        setOpenBackDrop(false);
    };
    const handleToggleBackdrop = () => {
        setOpenBackDrop(true);
    };

    const clickDelete = (event: any) => {
        handleToggleBackdrop();
        post("/public-article/delete", {
            fileLink: event.target.value,
        }).then((res: any) => {
            console.log(res);
            if (res.status === 200) {
                init();
                handleCloseBackdrop();
            }
        })
    }

    function init() {
        handleToggleBackdrop();
        post("/public-article/all",
            localStorage.getItem("v5_token")).then((res: any) => {
            if (res.status === 200) {
                setRenderRows(res.data.reverse());
                handleCloseBackdrop();
            }
        })
    }

    useEffect(() => {
        init();
    }, [])

    const openInNewTab = (url: string) => {
        // 👇️ setting target to _blank with window.open
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const clickDownload = (event: any) => {
        const url = Global.baseUrl
            + "/public-article/download/"
            + event.target.value;
        openInNewTab(url);
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={openBackDrop}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">上传时间</TableCell>
                        <TableCell align="center">标题</TableCell>
                        <TableCell align="center">图片链接</TableCell>
                        <TableCell align="center">操作</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        renderRows.map((row: any) => (
                            <TableRow
                                key={row.fileLink}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    {row.pubDate}
                                </TableCell>
                                <TableCell align="center">
                                    {row.title}</TableCell>
                                <TableCell
                                    align="center"
                                >{row.imageLink}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="outlined"
                                        value={row.fileLink}
                                        onClick={clickDownload}
                                    >
                                        下载文件
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color={"error"}
                                        value={row.fileLink}
                                        onClick={clickDelete}
                                    >
                                        删除
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const PublicArticle = () => {

    const navigate = useNavigate();
    const [file, setFile] = useState("null");
    const [title, setTitle] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [open, setOpen] = React.useState(false);
    const [fileName, setFileName] = React.useState("");


    const handleTitleChanged = (event: any) => {
        setTitle(event.target.value);
    }

    const handleImageLinkChanged = (event: any) => {
        setImageLink(event.target.value);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    function upload(formData: FormData) {
        fetch(Global.baseUrl + '/public-article/upload', {
            method: 'post',
            body: formData,
        }).then(response => response.json())
            .then(data => {
                navigate(0);
            });
    }

    function handleApply() {
        if (file === "none") {
            alert("请选择一个文件，再上传！");
            return;
        }

        if (imageLink === "") {
            alert("请填写图片链接！");
            return;
        }

        let formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("imageLink", imageLink);

        upload(formData);

        handleClose();
    }

    const fileInputChange = (event: any) => {
        const newFile = event.target.files[0];
        if (newFile.size >= 1048576 * 10) {
            alert("文件不能大于 10M ");
            return;
        }
        if (newFile.name.split('.').pop().toLowerCase() !== "md" &&
            newFile.name.split('.').pop().toLowerCase() !== "pdf" &&
            newFile.name.split('.').pop().toLowerCase() !== "html") {
            alert("上传的文件不是 md|pdf|html 形式，系统拒收");
            return;
        }

        setFile(event.target.files[0]);
        setFileName(newFile.name);
    }

    return (
        <Stack>
            <Grid container>
                <Grid xs={10}>
                    <Typography
                        sx={{
                            margin: 3,
                            fontFamily: "黑体",
                            fontWeight: "bold",
                            fontSize: 20,
                        }}
                    >
                        管理公共页面文章
                    </Typography>
                </Grid>
                <Grid xs={2}>
                    <Button
                        sx={{marginTop:3}}
                        onClick={handleOpen}
                        variant={"contained"}
                    >上传新文档</Button>
                </Grid>
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>新建文章</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        注意！文章必须是以 md|pdf|html 的形式上传，并且文件大小不得大于10Mb，
                        单次最多上传1个文件
                    </DialogContentText>
                    <Stack>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="文章标题（必填）"
                            fullWidth
                            variant="standard"
                            value={title}
                            onChange={handleTitleChanged}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="封面图链接（必填）"
                            fullWidth
                            variant="standard"
                            value={imageLink}
                            onChange={handleImageLinkChanged}
                        />
                        <Button
                            variant="outlined"
                            component="label"
                            sx={{
                                margin: 1,
                                height: 160,
                                fontSize: 24
                            }}
                        >
                            点击上传 <DriveFolderUploadIcon/>
                            <input
                                hidden accept="text/article"
                                multiple type="file"
                                onChange={fileInputChange}
                            />
                        </Button>
                        <Typography
                            sx={{
                                fontSize: 18,
                                fontWeight: "bold",
                            }}
                        >
                            当前接收到的文件：{fileName}
                        </Typography>
                    </Stack>

                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        sx={{
                            marginRight: 3,
                            marginBottom: 3,
                        }}
                    >
                        取消
                    </Button>
                    <Button
                        onClick={handleApply}
                        sx={{
                            marginRight: 5,
                            marginBottom: 3,
                        }}
                    >
                        上传
                    </Button>
                </DialogActions>
            </Dialog>
            <MarkdownTable></MarkdownTable>
        </Stack>
    );
}
export default PublicArticle;