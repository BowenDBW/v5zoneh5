import {useNavigate} from "react-router-dom";
import {post} from "./utils/Request";
import {Box, Button, CardContent, Divider, Typography} from "@mui/material";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

export default function MessageCard(props: any) {

    const {name, message, date, isMine, init} = props;
    const navigate = useNavigate();

    const [openBackDrop, setOpenBackDrop] = React.useState(false);

    const handleCloseBackdrop = () => {
        setOpenBackDrop(false);
    };
    const handleToggleBackdrop = () => {
        setOpenBackDrop(true);
    };

    const onDelete = () => {
        handleToggleBackdrop();
        post("/message-board/delete", {
            uploader: localStorage.getItem("v5_token"),
            message: message,
            date: date,
        }).then((res: any) => {
            console.log(res.data);
            init();
            handleCloseBackdrop();
        })
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
                            color="error"
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
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackDrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>

    );
}
