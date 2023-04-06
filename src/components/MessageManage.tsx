import React, {useState} from 'react';
import {post} from "./utils/Request";
import {Box, Grid, Stack} from "@mui/material";
import MessageCard from "./MessageCard";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import {useNavigate} from "react-router-dom";
import Global from "../GlobalParams";

const MessageManage = () => {

    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [nameFromId, setNameFromId] = useState("");
    const [openBackDrop, setOpenBackDrop] = React.useState(false);

    const handleCloseBackdrop = () => {
        setOpenBackDrop(false);
    };
    const handleToggleBackdrop = () => {
        setOpenBackDrop(true);
    };
    const init = () => {
        handleToggleBackdrop();
        post("/message-board/get-all",
            localStorage.getItem("v5_token")).then((res: any) => {
            console.log(res);
            if (res.status === 200) {
                setMessages(res.data.reverse());
                res.data.map((option: any) => {
                    console.log(option.uploader)
                });
            }
        }).catch(() => {
            alert("登录信息过期，请重新登录");
            navigate("/auth/login");
        })
        post("/member/name",
            localStorage.getItem("v5_token")).then((res: any) => {
            console.log(res);
            if (res.status === 200) {
                setNameFromId(res.data.msg);
                console.log(nameFromId);
            }
        }).catch(() => {
            alert("登录信息过期，请重新登录");
            navigate("/auth/login");
        })
        handleCloseBackdrop();
    }

    React.useEffect(()=>{
        init();
    },[]);

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackDrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {Global.isDesktop ?
                <Box>
                    <Grid container spacing={2}>
                        {messages.map((option: any) => (
                            <Grid xs={4}>
                                <MessageCard name={option.uploader}
                                             date={option.date}
                                             message={option.message}
                                             isMine={true}
                                             init={init}
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
                                     isMine={true}
                                     init={init}
                        />
                    ))}
                </Stack>
            }
        </div>
    );
};

export default MessageManage;
