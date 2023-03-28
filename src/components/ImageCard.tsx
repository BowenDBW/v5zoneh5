import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {post} from "./utils/Request";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardMedia,
    MenuItem,
    TextField
} from "@mui/material";
import copy from "copy-to-clipboard";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

export default function ImageCard(props: any) {

    const {imageUrl, access, title, init} = props;
    const [isPublic, setIsPublic] = useState(access === true);
    const [openBackDrop, setOpenBackDrop] = React.useState(false);

    const handleCloseBackdrop = () => {
        setOpenBackDrop(false);
    };
    const handleToggleBackdrop = () => {
        setOpenBackDrop(true);
    };

    const imageType = [
        {
            value: '公开上墙',
            label: '公开上墙',
        },
        {
            value: '私有',
            label: '私有',
        },
    ];

    const handleChange = (event: any) => {
        handleToggleBackdrop();
        setIsPublic(event.target.value === "公开上墙")
        post("/album/set-public", {
            token: localStorage.getItem("v5_token"),
            isPublic: !isPublic,
            resourceLink: title,
        }).then((res: any) => {
            console.log(res);
            if (res.status === 200) {
                console.log(res.data);
                init();
                handleCloseBackdrop();
            }
        })
    }

    const onDelete = () => {
        handleToggleBackdrop();
        post("/album/delete", {
            token: localStorage.getItem("v5_token"),
            isPublic: isPublic,
            resourceLink: title,
        }).then((res: any) => {
            console.log(res.data);
            init();
            handleCloseBackdrop();
        })
    }

    return (
        <Card sx={{
            margin: 3,
            height: 400,
        }}>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={openBackDrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="300"
                    width="300"
                    image={imageUrl}
                />
            </CardActionArea>
            <CardActions
                sx={{
                    margin: 1,
                }}
            >
                <TextField
                    id="访问类型"
                    select
                    label="访问类型"
                    defaultValue={isPublic ? "公开上墙" : "私有"}
                    size="small"
                    sx={{
                        margin: 2,
                        width: "34%",
                    }}
                    onChange={handleChange}
                >
                    {imageType.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <Button
                    size="small"
                    variant="contained"
                    onClick={() => {
                        copy(imageUrl);
                    }}
                    sx={{marginX:3}}
                >
                    复制链接
                </Button>
                <Button
                    size="small"
                    color="error"
                    variant="contained"
                    onClick={onDelete}
                >
                    删除
                </Button>
            </CardActions>
        </Card>
    )
}
