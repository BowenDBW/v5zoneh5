import {useNavigate} from "react-router-dom";
import {post} from "./utils/Request";
import {Box, Button, CardContent, Divider, Typography} from "@mui/material";
import React from "react";

export default function MessageCard(props: any) {
    const {name, message, date, isMine} = props

    const navigate = useNavigate();

    const onDelete = () => {
        post("/message-board/delete", {
            uploader: localStorage.getItem("v5_token"),
            message: message,
            date: date,
        }).then((res: any) => {
            console.log(res.data);
        })

        navigate(0);
    }

    return (
        <Box sx={{
            margin: 3,
            backgroundColor: "#f1f1f1",
            boxShadow: "0 0 15px 10px #FFFFFF",
        }}>
            <React.Fragment>
                <CardContent>
                    <Typography sx={{fontSize: 16}} color="text.secondary" gutterBottom>
                        {date}
                    </Typography>
                    <Typography sx={{fontSize: 18}} variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography sx={{fontSize: 20}} variant="body1" color="text.secondary">
                        {message}
                    </Typography>
                    {isMine ?
                        <Button
                            size="small"
                            sx={{
                                backgroundColor: "#e69191"
                            }}
                            variant="contained"
                            onClick={onDelete}
                        >
                            删除
                        </Button>
                        :
                        <div/>
                    }
                </CardContent>
            </React.Fragment>
            <Divider/>
        </Box>

    );
}
