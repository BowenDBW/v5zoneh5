import {
    Box,
    ImageList,
    ImageListItem,
    Pagination,
    Typography} from '@mui/material';
import React from 'react';
import {post} from "../../components/utils/Request";
import GlobalParams from "../../GlobalParams";
import Global from "../../GlobalParams";
import {useNavigate} from "react-router-dom/";
import Grid from "@mui/material/Grid";

const ImageBoard = () => {

    const navigate = useNavigate();
    const [imageList, setImageList] = React.useState([]);
    const [pageNumber, setPageNumber] = React.useState(1);
    const [pageCount, setPageCount] = React.useState(1);

    const getListByPage = (pageIndex:number) => {
        post("/album/get-imgs-by-page",
            {token: pageIndex}
        ).then((res: any) => {
            if (res.status === 200) {
                const list = res.data.reverse();
                list.map((item: any) => {
                    item.title = item.resourceLink;
                    item.resourceLink = GlobalParams.baseUrl
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

    React.useEffect(() => {
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
                >
                    Zone 照片墙
                </Typography>
            }
            <ImageList variant="masonry" cols={3} gap={8}>
                {imageList.map((item: any) => (
                    <ImageListItem key={item.img}>
                        <img
                            src={`${item.resourceLink}?w=248&fit=crop&auto=format`}
                            srcSet={`${item.resourceLink}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
            <Box
                sx={{
                    position:"fixed",
                    bottom:0,
                    width:"100%",
                    height:"5vh",
                    background:"#ffffff",
                    zIndex:20,
                    display:"flex",
                    justifyContent:"center",
                }}
            >
                <Grid container>
                    <Grid xs={2.5}/>
                    <Grid xs={8}>
                        <Pagination
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
                    <Grid xs={1.5}/>
                </Grid>
            </Box>
        </Box>

    );
};

export default ImageBoard;
