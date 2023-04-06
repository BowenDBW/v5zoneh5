import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    MenuItem,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {post} from "../../components/utils/Request"
import GlobalParams from "../../GlobalParams";
import {IsDesktop} from "../../components/utils/IsDesktop";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import ImageCard from "../../components/ImageCard";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import {useNavigate} from "react-router-dom/";
import Global from "../../GlobalParams";

const ImageBad = () => {

    const navigate = useNavigate();
    const [methodState, setMethodState] = useState("公开上墙");
    const [imageList, setImageList] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [file, setFile] = React.useState(null);
    const [fileName, setFileName] = React.useState("");
    const [openBackDrop, setOpenBackDrop] = React.useState(false);

    const handleCloseBackdrop = () => {
        setOpenBackDrop(false);
    };
    const handleToggleBackdrop = () => {
        setOpenBackDrop(true);
    };

    const method = [
        {
            value: '公开上墙',
            label: '公开上墙',
        },
        {
            value: '私有',
            label: '私有',
        },
    ];

    const fileInputChange = (event: any) => {
        handleToggleBackdrop();
        const newFile = event.target.files[0];
        if (newFile.size >= 1048576 * 10) {
            alert("文件不能大于 10M ");
            handleCloseBackdrop();
            return;
        }
        setFile(event.target.files[0]);
        setFileName(newFile.name);
        console.log(fileName);
        handleCloseBackdrop();
    }

    function init() {
        handleToggleBackdrop();
        post("/album/get-mine",
            localStorage.getItem("v5_token")).then((res: any) => {
            if (res.status === 200) {
                const list = res.data.reverse();
                console.log("test_base_url: " + GlobalParams.baseUrl);
                list.map((item: any) => {
                    item.title = item.resourceLink;
                    item.resourceLink =
                        GlobalParams.baseUrl
                        + "/album/download/"
                        + item.resourceLink;
                });
                setImageList(list);
                handleCloseBackdrop();
            }
        }).catch(() => {
            alert("登录信息过期，请重新登录");
            navigate("/auth/login");
        })
    }

    useEffect(() => {
        init();
    }, [])

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    function upload(formData: FormData) {
        fetch(GlobalParams.baseUrl + '/album/upload', {
            method: 'post',
            body: formData,
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                init();
                handleCloseBackdrop();
                return true;
            }).catch(() => {
            handleCloseBackdrop();
            alert("登录信息过期，请重新登录");
            navigate("/auth/login");
        })

        return false;
    }

    function handleApply() {
        new Promise(function (resolve, reject){
            handleToggleBackdrop();
            if (file === null) {
                alert("请选择一个文件，再上传！");
                handleCloseBackdrop();
                return;
            }

            const isPublic = (methodState === "公开上墙") ? "true" : "false";

            let formData = new FormData();
            // @ts-ignore
            formData.append("id", localStorage.getItem("v5_token"));
            formData.append("isPublic", isPublic);
            formData.append("file", file);
            resolve(upload(formData));
        }).then(function (){
            handleClose();
        });
    }

    const onMethodChanged = (event: any) => {
        setMethodState(event.target.value);
    }

    return (
        <Box>
            {Global.isDesktop ?
                <div/>
                :
                <Typography
                    align="center"
                    sx={{
                        fontFamily: "黑体",
                        fontSize: 20,
                        fontWeight: "bold",
                        height: 32,
                        marginTop: 2
                    }}
                >我的图床</Typography>
            }
            <Button
                variant="contained"
                component="label"
                sx={{
                    margin: 1,
                    position: "absolute",
                    right: 20,
                }}
                onClick={handleClickOpen}
            >
                上传新照片
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={openBackDrop}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <DialogTitle>新建上传</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        注意！ 图片的大小不得大于10Mb，单次最多上传1张照片
                    </DialogContentText>
                    <Stack>
                        <TextField
                            id="访问限制"
                            select
                            label="访问限制"
                            defaultValue="公开上墙"
                            size="medium"
                            sx={{
                                margin: 2,
                                width: "30%",
                            }}
                            value={methodState}
                            onChange={onMethodChanged}
                        >
                            {method.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
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
                                hidden accept="image/*"
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
                    <Button onClick={handleClose} sx={{marginRight: 3, marginBottom: 3}}>取消</Button>
                    <Button onClick={handleApply} sx={{marginRight: 5, marginBottom: 3}}>上传</Button>
                </DialogActions>
            </Dialog>
            <Box sx={{height: 50}}/>
            {Global.isDesktop ?
                <Box>
                    <Grid container spacing={2}>
                        {imageList.map((option: any) => (
                            <Grid xs={4}>
                                <ImageCard
                                    imageUrl={option.resourceLink}
                                    access={option.isPublic}
                                    title={option.title}
                                    init={init}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                :
                <Stack>
                    {imageList.map((option: any) => (
                        <ImageCard imageUrl={option.resourceLink}
                                   access={option.isPublic}
                                   title={option.title}
                                   init={init}
                        />
                    ))}
                </Stack>
            }
        </Box>
    );
};

export default ImageBad;
