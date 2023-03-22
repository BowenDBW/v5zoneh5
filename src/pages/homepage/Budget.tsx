import React, {useEffect, useState} from 'react';
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Button,
    Switch,
    FormControlLabel,
    FormGroup,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {post} from "../../components/utils/Request";
import {IsDesktop} from "../../components/utils/IsDesktop";
import Paper from "@mui/material/Paper";
import {BudgetRow} from "../../components/BudgetRow";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const Budget = () => {

    const navigate = useNavigate();
    const isDesktop = IsDesktop();
    const [renderRows, setRenderRows] = useState([]);
    const [applyType, setApplyType] = useState("");
    const [applyDescription, setApplyDescription] = useState("");
    const [applyAmount, setApplyAmount] = useState("");
    const [applyTele, setApplyTele] = useState("");
    const [invoiceRequired, setInvoiceRequired] = useState(false);
    const [openBackDrop, setOpenBackDrop] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const type = [
        {
            value: '支出',
            label: '支出',
        },
        {
            value: '收入',
            label: '收入',
        },
    ];

    const method = [
        {
            value: '全部',
            label: '全部',
        },
        {
            value: '进行中',
            label: '进行中',
        },
    ];

    const time = [
        {
            value: '全部',
            label: '全部',
        },
        {
            value: '一月内',
            label: '一月内',
        },
        {
            value: '三月内',
            label: '三月内',
        },

    ];

    const handleCloseBackdrop = () => {
        setOpenBackDrop(false);
    };
    const handleToggleBackdrop = () => {
        setOpenBackDrop(true);
    };

    const handleDescriptionChanged = (event:any) => {
        setApplyDescription(event.target.value);
    }

    const handleTypeChanged = (event:any) => {
        setApplyType(event.target.value);
    }

    const handleAmountChanged = (event:any) => {
        setApplyAmount(event.target.value);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleTeleChanged(event:any) {
        setApplyTele(event.target.value);
    }

    function init() {
        post("/transaction/get-application-list",
            localStorage.getItem("v5_token")).then((res:any) => {
            if (res.status === 200) {
                setRenderRows(res.data.records.reverse());
            }
        })
    }

    useEffect(() => {
        init();
        getTele();
    }, [])

    const handleApply = () => {
        handleToggleBackdrop();
        if(applyType === ""){
            alert("申请类别不得为空");
            handleCloseBackdrop();
            return;
        }
        if(applyAmount === "" || 0){
            alert("申请金额不得为空或0");
            handleCloseBackdrop();
            return;
        }
        if(applyTele === ""){
            alert("申请人手机号不得为空");
            handleCloseBackdrop();
            return;
        }
        if(applyDescription === ""){
            alert("申请项说明不得为空");
            handleCloseBackdrop();
            return;
        }
        const data = {
            token: localStorage.getItem("v5_token"),
            description: applyDescription,
            type: applyType,
            amount: applyAmount,
            alipayTelephone: applyTele,
            isInvoiceRequired: invoiceRequired,
        }
        post('/transaction/apply', data).then((res:any) => {
            if (res.status === 200 && res.data.msg === "success") {
                alert("申请成功");
                setOpen(false);
                handleCloseBackdrop();
                navigate(0);
            }
        })
    };

    function getTele() {
        post("/member/tele",
            localStorage.getItem("v5_token")).then((res:any) => {
            if (res.status === 200) {
                setApplyTele(res.data.msg);
            }
        }).catch(() => {
            alert("登录信息过期，请重新登录")
            navigate("/login/auth")
        })
    }

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
                >经费报销</Typography>
            }
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={openBackDrop}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <DialogTitle>新建申请</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        注意！ 支出项目金额大于100需要申请发票！
                    </DialogContentText>
                    <TextField
                        id="申请类型"
                        select
                        label="申请类型"
                        defaultValue="支出"
                        size="small"
                        sx={{
                            margin: 3,
                            width: 120,
                        }}
                        value={applyType}
                        onChange={handleTypeChanged}
                    >
                        {type.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        sx={{
                            margin: 3,
                            fontWeight: "bold",
                        }}
                        variant="outlined"
                        onClick={() => {
                            navigate("/homepage/md?fileLink=Application.md&darkMode=false");
                        }}
                    >申请流程与要求
                    </Button>
                    <FormControlLabel
                        control={<Switch/>}
                        label="申请发票豁免"
                        sx={{marginX:3}}
                        onChange={()=>{
                            setInvoiceRequired(!invoiceRequired);
                            if(!invoiceRequired){
                                alert("发票豁免条件请仔细阅读申请流程与要求文档！");
                            }
                        }}
                        checked={invoiceRequired}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="申请项说明"
                        fullWidth
                        variant="standard"
                        value={applyDescription}
                        onChange={handleDescriptionChanged}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="申请金额"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={applyAmount}
                        onChange={handleAmountChanged}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="支付宝绑定手机号"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={applyTele}
                        onChange={handleTeleChanged}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        sx={{
                            fontWeight: "bold",
                            marginRight: 3,
                            marginBottom: 3,
                            fontSize: 18
                    }}>
                        取消
                    </Button>
                    <Button
                        onClick={handleApply}
                        sx={{
                            fontWeight: "bold",
                            marginRight: 5,
                            marginBottom: 3,
                            fontSize: 18
                    }}>
                        确认申请
                    </Button>
                </DialogActions>
            </Dialog>
            <Grid container spacing={1} sx={{textAlign: "center", marginY: 3}}>
                <Grid xs={4}>
                    <TextField
                        disabled={true}
                        id="类型筛选"
                        select
                        label="类型筛选"
                        defaultValue="全部"
                        size="small"
                        sx={{}}
                    >
                        {method.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid xs={4}>
                    <TextField
                        disabled={true}
                        id="时间筛选"
                        select
                        label="时间筛选"
                        defaultValue="全部"
                        size="small"
                        sx={{}}
                    >
                        {time.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid xs={4}>
                    <Button
                        variant="contained"
                        onClick={handleClickOpen}
                    >新建申请</Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            {isDesktop ?
                                <TableCell align="center">交易编号</TableCell>
                                :
                                <div/>
                            }
                            <TableCell align="center">申请项</TableCell>
                            <TableCell align="center">类型</TableCell>
                            <TableCell align="center">金额</TableCell>
                            {isDesktop ?
                                <TableCell align="center">支付宝手机号</TableCell>
                                :
                                <div/>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderRows.map((row:any) => (
                            <BudgetRow key={row.name} row={row}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Budget;
