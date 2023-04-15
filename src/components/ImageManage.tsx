import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import GlobalParams from "../GlobalParams";
import Global from "../GlobalParams";
import {post} from "./utils/Request";
import {Box, Grid, Pagination, Stack, Typography} from "@mui/material";
import ImageCard from "./ImageCard";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const ImageManage = () => {

    const navigate = useNavigate();
    const [imageList, setImageList] = useState([]);
    const [openBackDrop, setOpenBackDrop] = React.useState(false);
    const [pageNumber, setPageNumber] = React.useState(1);
    const [pageCount, setPageCount] = React.useState(1);

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
        post("/album/get-public-count",
            {token: pageNumber}
        ).then((res: any) => {
            if (res.status === 200) {
                setPageCount(res.data.msg);
            }
        }).catch(() => {
            alert("登录信息过期，请重新登录");
            navigate("/auth/login");
        });
        getListByPage(pageNumber);
    }

    const getListByPage = (pageIndex:number) => {
        post("/album/get-imgs-by-page",
            {token: pageIndex}
        ).then((res: any) => {
            if (res.status === 200) {
                const list = res.data.reverse();
                list.map((item: any) => {
                    item.title = item.resourceLink;
                    item.resourceLink = GlobalParams.backendUrl
                        + "/album/download/"
                        + item.resourceLink
                });
                setImageList(list);
            }
        }).catch(() => {
            alert("登录信息过期，请重新登录");
            navigate("/auth/login");
        });
    }

    React.useEffect(() => {
        init();
    }, [])


    useEffect(() => {
        init();
    }, [])

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
            <Box
                sx={{
                    position:"fixed",
                    top: "13vh",
                    width:"100%",
                    height:"5vh",
                    background:"#ffffff",
                    zIndex:20,
                    display:"-flex",
                }}
            >
                <Grid container>
                    <Grid xs={2}>
                        <Typography
                            sx={{
                                marginTop:1,
                                fontFamily:"font5",
                                fontSize:18,
                                marginLeft: 2,
                            }}
                        >
                            当前第 {pageNumber} 页，共 {pageCount} 页
                        </Typography>
                    </Grid>
                    <Grid xs={8}>
                        <Pagination
                            sx={{marginTop:0.5}}
                            count={pageCount}
                            boundaryCount={2}
                            siblingCount={2}
                            variant="outlined"
                            color="primary"
                            page={pageNumber}
                            showFirstButton
                            showLastButton
                            onChange={(event,page)=>{
                                setPageNumber(page);
                                getListByPage(page);
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={openBackDrop}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        </Box>
    );
};

export default ImageManage;
