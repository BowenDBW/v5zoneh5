import React, {useEffect, useState} from 'react';
import {IsDesktop} from "./utils/IsDesktop";
import {useNavigate} from "react-router-dom";
import GlobalParams from "../GlobalParams";
import {post} from "./utils/Request";
import {
    Box,
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Grid, MenuItem,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import ImageCard from "./ImageCard";

const ImageManage = () => {
    const isDesktop = IsDesktop();
    const navigate = useNavigate();
    const [imageList, setImageList] = useState([]);
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

    function init() {
        handleToggleBackdrop();
        post("/album/get-public",
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

    return (
        <Box>
            {isDesktop ?
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
            <Box sx={{height: 50}}/>
            {isDesktop ?
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

export default ImageManage;
