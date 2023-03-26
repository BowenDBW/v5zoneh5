import React, {useState} from 'react';
import {
    Box,
    Button,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import {useNavigate} from "react-router-dom";
import MyStepper from "./MyStepper";
import {IsDesktop} from "./utils/IsDesktop";
import GlobalParams from "../GlobalParams";
import {post} from "./utils/Request";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

export function BudgetRow(props:any) {
    const navigate = useNavigate()
    const {row, init} = props;
    const id = row.id;
    const history = row.history;
    const [fileName, setFileName] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [file, setFile] = useState("null");
    const [openBackDrop, setOpenBackDrop] = React.useState(false);

    const handleCloseBackdrop = () => {
        setOpenBackDrop(false);
    };
    const handleToggleBackdrop = () => {
        setOpenBackDrop(true);
    };
    function clickUpload() {
        setOpen2(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    const clickStop = (event:any) => {
        handleToggleBackdrop();
        post("/transaction/admin", {
            "token": id,
            "message": "canceled",
        }).then((res:any) => {
            if (res.status === 200) {
                init();
                handleCloseBackdrop();
            }
        });
    }

    function upload(formData:FormData) {
        handleToggleBackdrop();
        fetch(GlobalParams.baseUrl + '/transaction/upload', {
            method: 'post',
            body: formData,
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                init();
                handleCloseBackdrop();
            });
    }

    function handleApply() {
        if (file === "none") {
            alert("请选择一个文件，再上传！");
            return;
        }

        let formData = new FormData();
        formData.append("id", id);
        formData.append("file", file);

        upload(formData);

        handleClose2();
    }

    const openInNewTab = (url:any) => {
        // 👇️ setting target to _blank with window.open
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const clickDownload = (event:any) => {
        const url = GlobalParams.baseUrl
            + "/transaction/download/"
            + event.target.value;
        openInNewTab(url);
    }

    const fileInputChange = (event:any) => {
        const newFile = event.target.files[0];
        if (newFile.size >= 1048576 * 10) {
            alert("文件不能大于 10M ");
            return;
        }
        setFile(event.target.files[0]);
        setFileName(newFile.name);
    }

    const isDesktop = IsDesktop();

    function clickExemption() {
        handleToggleBackdrop();
        post("/transaction/exemption", {
            "token": id,
        }).then((res:any) => {
            if (res.status === 200) {
                init();
                handleCloseBackdrop();
            }
        });
    }

    function genIsApplied(row:any){
        if(row.type === "收入"){
            return "";
        }else {
            if(row.isInvoiceRequired){
                return "已申请";
            }else {
                return "未申请";
            }
        }
    }

    function genStage(row:any){
        const stage:number = row.stage;
        if(stage === 0){
            return "交易取消或被拒绝";
        }else if(stage === 1){
            return "已发起申请";
        }else if(stage === 2){
            return "未上传发票";
        }else if(stage === 3){
            return "已上传发票，等待确认";
        }else if(stage === 4){
            return "交易完成";
        }
    }

    return (
        <React.Fragment>
            <Dialog
                open={open2}
                onClose={handleClose2}
            >
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={openBackDrop}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <DialogTitle>新建上传</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        注意！ 发票必须是以 PDF 的形式上传，并且文件大小不得大于10Mb，
                        单次最多上传1个文件
                    </DialogContentText>
                    <Stack>
                        <Button
                            variant="outlined"
                            component="label"
                            sx={{
                                margin: 1,
                                height: 160,
                                fontSize: 24
                            }}
                        >
                            点击上传 <DriveFolderUploadIcon/>
                            <input
                                hidden accept="application/pdf"
                                multiple type="file"
                                onChange={fileInputChange}
                            />
                        </Button>
                        <Typography
                            sx={{
                                fontSize: 18,
                                fontWeight: "bold",
                            }}
                        >
                            当前接收到的文件：{fileName}
                        </Typography>
                    </Stack>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose2} sx={{marginRight: 3, marginBottom: 3}}>取消</Button>
                    <Button onClick={handleApply} sx={{marginRight: 5, marginBottom: 3}}>上传</Button>
                </DialogActions>
            </Dialog>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                {isDesktop ?
                    <TableCell align="center">{row.id}</TableCell>
                    :
                    <div/>
                }
                <TableCell component="th" scope="row" align="center">
                    {row.intention}
                </TableCell>
                <TableCell align="center">
                    {genStage(row)}
                </TableCell>
                <TableCell align="center">{row.type}</TableCell>
                <TableCell align="center">{row.cost}</TableCell>
                <TableCell align="center">
                    {genIsApplied(row)}
                </TableCell>
                {isDesktop ?
                    <TableCell align="center">{row.alipayTele}</TableCell>
                    :
                    <div/>
                }
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography variant="h6" gutterBottom component="div">
                                申请项细节
                            </Typography>
                            <Grid container spacing={1} sx={{margin: 1, textAlign: "center"}}>
                                <Grid xs={3}>
                                    <Button
                                        disabled={row.stage !== 1}
                                        variant="contained"
                                        value={row.id}
                                        onClick={clickStop}
                                        color={"warning"}
                                        sx={{
                                            marginX: 1,
                                            fontWeight: "bold",
                                        }}
                                    >撤销</Button>
                                </Grid>

                                <Grid xs={3}>
                                    <Button
                                        disabled={row.stage === 0 || row.stage === 3 ||
                                            row.stage === 4 || row.isInvoiceRequired}
                                        variant="contained"
                                        onClick={clickExemption}
                                        color={"secondary"}
                                        sx={{
                                            marginX: 1,
                                            fontWeight: "bold",
                                        }}
                                    >申请发票豁免</Button>
                                </Grid>

                                <Grid xs={3}>
                                    <Button
                                        disabled={(row.stage !== 2 && row.stage !== 3) || row.isInvoiceRequired}
                                        variant="contained"
                                        onClick={clickUpload}
                                        color={"success"}
                                        sx={{
                                            marginX: 1,
                                            fontWeight: "bold",
                                        }}
                                    >上传发票</Button>
                                </Grid>

                                <Grid xs={3}>
                                    <Button
                                        disabled={!(row.stage > 2
                                            && row.type === "支出" && row.cost >= 100)}
                                        variant="contained"
                                        value={row.fileName}
                                        onClick={clickDownload}
                                    >
                                        查看发票
                                    </Button>
                                </Grid>

                            </Grid>
                            <MyStepper cost={row.cost}
                                       type={row.type}
                                       stage={row.stage}
                                       isInvoiceRequired={row.isInvoiceRequired}/>

                            <Divider/>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">操作时间</TableCell>
                                        <TableCell align="center">描述</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {history.map((historyRow:any) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row" align="center">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell align="center">{historyRow.description}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}