import React, {useEffect, useState} from "react";
import {Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import Paper from "@mui/material/Paper";
import {useNavigate} from "react-router-dom";
import {post} from "./utils/Request";
import GlobalParams from "../GlobalParams";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

export default function Admission() {

    const [renderRows, setRenderRows] = useState([]);
    const [isVice, setVice] = useState(false);
    const [openBackDrop, setOpenBackDrop] = React.useState(false);

    const handleCloseBackdrop = () => {
        setOpenBackDrop(false);
    };
    const handleToggleBackdrop = () => {
        setOpenBackDrop(true);
    };

    function init() {
        handleToggleBackdrop();
        post("/auth/is-monitor", localStorage.getItem("v5_token"))
            .then((res: any) => {
                setVice(res.data === "VICE_CAPTAIN");
            })
        post("/transaction/get-admission-needed-list",
            localStorage.getItem("v5_token")).then((res: any) => {
            if (res.status === 200) {
                if (res.data.records !== "") {
                    setRenderRows(res.data.records);
                    handleCloseBackdrop();
                }
            }
        })
    }

    useEffect(() => {
        init();
    }, [])

    const clickDeny = (event: any) => {
        handleToggleBackdrop();
        post("/transaction/admin", {
            "token": event.target.value,
            "message": "interrupted",
        }).then((res: any) => {
            if (res.status === 200) {
                init();
                handleCloseBackdrop();
            }
        });

    }

    const clickPass = (event: any) => {
        handleToggleBackdrop();
        post("/transaction/admin", {
            "token": event.target.value,
            "message": "forward",
        }).then((res: any) => {
            init();
            handleCloseBackdrop();
        });
    }

    const openInNewTab = (url: string) => {
        // 👇️ setting target to _blank with window.open
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const clickDownload = (event: any) => {
        const url = GlobalParams.baseUrl
            + "/transaction/download/"
            + event.target.value;
        openInNewTab(url);
    };

    const genDescription = (row:any) => {
        if(row.type === "收入"){
            return "发起入账申请，等待通过";
        }else if(row.stage === 1 && row.isInvoiceRequired) {
            return "发起支出申请和发票豁免，等待通过";
        }else if(row.isInvoiceRequired){
            return "发起发票豁免，等待通过";
        }else if(row.stage === 1){
            return "发起支出申请，等待通过";
        }else if(row.stage === 3){
            return "发票上传，等待确认";
        }
        return "";
    }

    return (
        <Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackDrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box>
                <Typography
                    sx={{
                        margin: 3,
                        fontFamily: "黑体",
                        fontWeight: "bold",
                        fontSize: 20,
                    }}
                >
                    管理经费审批
                </Typography>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">申请项</TableCell>
                                <TableCell align="center">申请人</TableCell>
                                <TableCell align="center">申请类型</TableCell>
                                <TableCell align="center">申请金额</TableCell>
                                <TableCell align="center">支付宝手机号</TableCell>
                                <TableCell align="center">下载发票</TableCell>
                                <TableCell align="center">当前目的</TableCell>
                                <TableCell align="center">操作</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                renderRows.map((row: any) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row" align="center">
                                            {row.intention}
                                        </TableCell>
                                        <TableCell align="center">{row.name}</TableCell>
                                        <TableCell
                                            align="center"
                                        >{row.type}</TableCell>
                                        <TableCell align="center">{row.cost}</TableCell>
                                        <TableCell align="center">{row.alipayTele}</TableCell>
                                        <TableCell align="center">
                                            <Button
                                                disabled={row.stage === 1 || !isVice}
                                                variant="outlined"
                                                value={row.fileName}
                                                onClick={clickDownload}
                                            >
                                                下载发票
                                            </Button>
                                        </TableCell>
                                        <TableCell sx={{textAlign:"center"}}>
                                            {genDescription(row)}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                disabled={!isVice}
                                                variant="contained"
                                                color={"success"}
                                                value={row.id}
                                                onClick={clickPass}
                                            >
                                                通过
                                            </Button>
                                            <Button
                                                disabled={!isVice}
                                                variant="contained"
                                                color={"error"}
                                                value={row.id}
                                                onClick={clickDeny}
                                            >
                                                拒绝
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}
