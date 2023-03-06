import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {post} from "./utils/Request";
import {Button, Card, CardActionArea, CardActions, CardMedia, MenuItem, TextField} from "@mui/material";
import {Simulate} from "react-dom/test-utils";
import copy = Simulate.copy;

export default function ImageCard(props: any) {

    const navigate = useNavigate()
    const {imageUrl, access, title} = props;
    const [isPublic, setIsPublic] = useState(access === true);

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
        setIsPublic(event.target.value === "公开上墙")
        post("/album/set_public", {
            uploader: localStorage.getItem("v5_id"),
            isPublic: !isPublic,
            resourceLink: title,
        }).then((res: any) => {
            console.log(res);
            if (res.status === 200) {
                console.log(res.data);
            }
        })
    }

    const onDelete = () => {

        post("/album/delete", {
            uploader: localStorage.getItem("v5_id"),
            isPublic: isPublic,
            resourceLink: title,
        }).then((res: any) => {
            console.log(res.data);
        })

        navigate(0);
    }

    return (
        <Card sx={{
            margin: 3,
        }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="100%"
                    width="100%"
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
                        width: 120,
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
