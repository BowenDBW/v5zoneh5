import {Box, ImageList, ImageListItem, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {IsDesktop} from "../../components/utils/IsDesktop";
import {post} from "../../components/utils/Request";
import GlobalParams from "../../GlobalParams";

const ImageBoard = () => {
    const isDesktop = IsDesktop()

    const [imageList, setImageList] = useState([])

    function init() {
        post("/album/get_public", localStorage.getItem("v5_id"))
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
            })
    }

    useEffect(() => {
        init();
    }, [])

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
                >Zone 照片墙</Typography>
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
