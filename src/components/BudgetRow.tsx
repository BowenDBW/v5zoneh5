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

export function BudgetRow(props:any) {
    const navigate = useNavigate()
    const {row} = props;
    const id = row.id;
    const history = row.history;
    const [fileName, setFileName] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [file, setFile] = useState("null");

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
        post("/transaction/admin", {
            "token": id,
            "message": "canceled",
        }).then((res:any) => {
            if (res.status === 200) {
                alert("操作成功");
                navigate(0);
            }
        });
    }

    function upload(formData:FormData) {
        fetch(GlobalParams.baseUrl + '/transaction/upload', {
            method: 'post',
            body: formData,
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                navigate(0);
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

        handleClose();
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
    return (
        <React.Fragment>
            <Dialog
                open={open2}
                onClose={handleClose2}
            >
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
                <TableCell align="center">{row.type}</TableCell>
                <TableCell align="center">{row.cost}</TableCell>
                {isDesktop ?
                    <TableCell align="center">{row.alipayTele}</TableCell>
                    :
                    <div/>
                }
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography variant="h6" gutterBottom component="div">
                                申请项细节
                            </Typography>
                            <Grid container spacing={1} sx={{margin: 1, textAlign: "center"}}>
                                <Grid xs={4}>
                                    <Button
                                        disabled={row.stage !== 1}
                                        variant="outlined"
                                        value={row.id}
                                        onClick={clickStop}
                                        sx={{
                                            backgroundColor: "#f6d3d3",
                                            marginX: 1,
                                            fontWeight: "bold",
                                        }}
                                    >撤销</Button>
                                </Grid>

                                <Grid xs={4}>
                                    <Button
                                        disabled={row.stage !== 2 && row.stage !== 3}
                                        variant="outlined"
                                        onClick={clickUpload}
                                        sx={{
                                            backgroundColor: "#d0eac5",
                                            marginX: 1,
                                            fontWeight: "bold",
                                        }}
                                    >上传发票</Button>
                                </Grid>

                                <Grid xs={4}>
                                    <Button
                                        disabled={!(row.stage > 2
                                            && row.type === "支出" && row.cost >= 100)}
                                        variant="outlined"
                                        value={row.fileName}
                                        onClick={clickDownload}
                                    >
                                        查看发票
                                    </Button>
                                </Grid>

                            </Grid>
                            <MyStepper cost={row.cost}
                                       type={row.type}
                                       stage={row.stage}/>

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