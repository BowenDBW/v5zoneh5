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
import {useNavigate} from "react-router-dom";
import {post} from "../../components/utils/Request"
import GlobalParams from "../../GlobalParams";
import {IsDesktop} from "../../components/utils/IsDesktop";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import ImageCard from "../../components/ImageCard";


const ImageBad = () => {
    const navigate = useNavigate()
    const [methodState, setMethodState] = useState("公开上墙");
    const isDesktop = IsDesktop();
    const [imageList, setImageList] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [file, setFile] = useState(null);
    let fileName: string = "";

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

    function upload(formData: FormData) {
        fetch(GlobalParams.baseUrl + '/album/upload', {
            method: 'post',
            body: formData,
        }).then(response => response.json())
            .then(data => {
                console.log(data);
            });
    }

    const fileInputChange = (event: any) => {
        const newFile = event.target.files[0];
        if (newFile.size >= 1048576 * 10) {
            alert("文件不能大于 10M ");
            return;
        }
        setFile(event.target.files[0]);
        fileName = newFile.name;
    }

    function init() {
        post("/album/get_mine",
            localStorage.getItem("v5_id")).then((res: any) => {
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
            }
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

    function handleApply() {
        if (file === null) {
            alert("请选择一个文件，再上传！");
            return;
        }

        const isPublic = (methodState === "公开上墙") ? "true" : "false";

        let formData = new FormData();
        // @ts-ignore
        formData.append("id", localStorage.getItem("v5_id"));
        formData.append("isPublic", isPublic);
        formData.append("file", file);

        upload(formData);

        navigate(0)
        handleClose();
    }

    const onMethodChanged = (event: any) => {
        setMethodState(event.target.value);
    }

    return (
        <Box>
            {isDesktop ? <div/> :
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
                上传新文件
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
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
                            size="small"
                            sx={{
                                margin: 2,
                                width: 120,
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
            {isDesktop ?
                <Box>
                    <Grid container spacing={2}>
                        {imageList.map((option: any) => (
                            <Grid xs={4}>
                                <ImageCard imageUrl={option.resourceLink}
                                           access={option.isPublic}
                                           title={option.title}
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
                        />
                    ))}
                </Stack>
            }
        </Box>
    );
};

export default ImageBad;
