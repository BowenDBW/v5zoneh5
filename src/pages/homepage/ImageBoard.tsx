import {
    Box,
    ImageList,
    ImageListItem,
    Typography
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {post} from "../../components/utils/Request";
import GlobalParams from "../../GlobalParams";
import {useNavigate} from "react-router-dom/";
import Global from "../../GlobalParams";

const ImageBoard = () => {

    const navigate = useNavigate();
    const [imageList, setImageList] = useState([]);

    function init() {
        post("/album/get-public", localStorage.getItem("v5_token"))
            .then((res: any) => {
                console.log(res);
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
        </Box>

    );
};

export default ImageBoard;
