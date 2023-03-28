import React from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack,} from "@mui/material";
import {post} from "./utils/Request";
import {useNavigate} from "react-router-dom/";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 200,
            width: 250,
        },
    },
};

const LifeCycle = () => {

    const navigate = useNavigate();
    const [isVice, setIsVice] = React.useState(false);
    const [newMonitorName, setNewMonitorName] = React.useState("");
    const [newMonitorId, setNewMonitorId] = React.useState("");
    const [members, setMembers] = React.useState([]);
    const [openBackDrop, setOpenBackDrop] = React.useState(false);

    const handleCloseBackdrop = () => {
        setOpenBackDrop(false);
    };
    const handleToggleBackdrop = () => {
        setOpenBackDrop(true);
    };

    const handleRetired = () => {
        handleToggleBackdrop();
        post("/member/force-session-retired", {
            token:localStorage.getItem("v5_token")
        }).then((res: any) => {
            if (res.status === 200) {
                if(res.data.msg === "true"){
                    alert("操作成功");
                }else {
                    alert("操作失败");
                }
                handleCloseBackdrop();
            }
        });
    }

    const alterCaptain = () => {
        handleToggleBackdrop();
        post("/auth/set-new-cap", {
                token:localStorage.getItem("v5_token"),
                message: newMonitorId
            }).then((res: any) => {
            if (res.status === 200) {
                if(res.data.msg === "true"){
                    alert("操作成功，您已移交队长称号，请重新登录");
                    navigate("/auth/login");
                }else {
                    alert("操作失败");
                }
                handleCloseBackdrop();
            }
        });
    }

    const alterViceCaptain = () => {
        handleToggleBackdrop();
        post("/auth/set-new-vice", {
            token:localStorage.getItem("v5_token"),
            message: newMonitorId
        }).then((res: any) => {
            if(res.data.msg === "true"){
                alert("操作成功，您已移交副队长称号，请重新登录");
                navigate("/auth/login");
            }else {
                alert("操作失败");
            }
            handleCloseBackdrop();
        });
    }

    const init = () => {
        handleToggleBackdrop();
        let method = "onServe";
        let school = "all";
        let techGroup = "all";
        post("/member/contact",
            {
                token: localStorage.getItem("v5_token"),
                sessionSelect: method,
                techSelect: techGroup,
                collegeSelect: school,
            }).then((res: any) => {
            console.log(res);
            if (res.status === 200) {
                setMembers(res.data.contactInfo);
            }
        });
        post("/auth/is-monitor", localStorage.getItem("v5_token"))
            .then((res: any) => {
                if(res.data === "VICE_CAPTAIN"){
                    setIsVice(true);
                }else {
                    setIsVice(false);
                }
                handleCloseBackdrop();
            });
    }

    React.useEffect(()=>{
        init();
    },[]);

    return (
        <Box sx={{margin:3}}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackDrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Stack>
                <Button
                    variant={"contained"}
                    onClick={handleRetired}
                    sx={{
                        margin: 5,
                        width: 225,
                        fontWeight: "bold"
                    }}
                >
                    强制让{new Date().getFullYear() - 4}及以前届次的队员退役
                </Button>
                <Box>
                    <FormControl
                        sx={{
                            width: 225,
                            marginX: 3,
                        }}
                    >
                        <InputLabel>
                            {isVice ? "副队长转让" : "队长转让"}
                        </InputLabel>
                        <Select
                            id="队长转让"
                            value={newMonitorName}
                            onChange={(event:any)=>{
                                setNewMonitorName(event.target.value);
                                members.map((option: any) => {
                                    if (option.name === event.target.value) {
                                        setNewMonitorId(option.id);
                                    }
                                });
                            }}
                            input={<OutlinedInput label={isVice ? "副队长转让" : "队长转让"}/>}
                            MenuProps={MenuProps}
                        >
                            {members.map((option:any) => (
                                <MenuItem
                                    key={option.name}
                                    value={option.name}
                                >
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        variant={"contained"}
                        onClick={()=>{
                            if(isVice){
                                alterViceCaptain();
                            }else {
                                alterCaptain();
                            }
                        }}
                        sx={{
                            marginTop: 1,
                            fontWeight: "bold"
                        }}
                    >
                        转让
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
};

export default LifeCycle;
