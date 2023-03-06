import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {IsDesktop} from "../../components/utils/IsDesktop";
import {useNavigate} from "react-router-dom";
import {post} from "../../components/utils/Request"
import MessageCard from "../../components/MessageCard";

const MessageBoard = () => {

    const isDesktop = IsDesktop()
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate()
    const [messages, setMessages] = useState([]);
    const [nameFromId, setNameFromId] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        init();
    }, []);

    const handleOnChange = (event: any) => {
        setMsg(event.target.value);
    }

    function init() {
        setTimeout(function () {
        }, 500);
        post("/message_board/get_all",
            localStorage.getItem("v5_id")).then((res: any) => {
            console.log(res);
            if (res.status === 200) {
                setMessages(res.data.reverse());
                res.data.map((option: any) => {
                    console.log(option.uploader)
                });
            }
        });
        post("/member/name",
            localStorage.getItem("v5_id")).then((res: any) => {
            console.log(res);
            if (res.status === 200) {
                setNameFromId(res.data.msg);
                console.log(nameFromId);
            }
        })
    }

    const handleApply = () => {
        post("/message_board/add", {
            uploader: localStorage.getItem("v5_id"),
            message: msg,
        }).then((res: any) => {
            console.log(res);
            if (res.status === 200) {
                alert("添加成功");
                navigate(0);
            }
        })
        setOpen(false);
    };

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
                >Zone 留言板</Typography>
            }
            <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{
                    margin: 2,
                    position: "absolute",
                    right: 20,
                }}>新建留言</Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>新建留言</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="你的留言"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleOnChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{fontSize: 16, marginRight: 3, marginBottom: 3}}>取消</Button>
                    <Button onClick={handleApply} sx={{fontSize: 16, marginRight: 5, marginBottom: 3}}>发布</Button>
                </DialogActions>
            </Dialog>
            <Box sx={{height: 50}}/>
            {isDesktop ?
                <Box>
                    <Grid container spacing={2}>
                        {messages.map((option: any) => (
                            <Grid xs={4}>
                                <MessageCard name={option.uploader}
                                             date={option.date}
                                             message={option.message}
                                             isMine={nameFromId === option.uploader}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                :
                <Stack>
                    {messages.map((option: any) => (
                        <MessageCard name={option.uploader}
                                     date={option.date}
                                     message={option.message}
                                     isMine={nameFromId === option.uploader}
                        />
                    ))}
                </Stack>
            }
        </Box>
    );
};

export default MessageBoard;
