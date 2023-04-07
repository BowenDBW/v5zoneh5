import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import GlobalParams from "../GlobalParams";
import {post} from "./utils/Request";
import TableContainer from "@mui/material/TableContainer";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Autocomplete from "@mui/material/Autocomplete";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    MenuItem,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

interface Member {
    id: string;
    name: string;
    session: string;
    college: string;
    techTeam: string;
    home: string;
    telephone: string;
    email: string;
    qq: string;
    isRetired: boolean;
}

const PrizeManage = () => {
    const navigate = useNavigate();
    const [rows, setRows] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [file, setFile] = useState("null");
    const [name, setName] = useState("");
    const [owners, setOwners] = useState<any>([]);
    const [ownerIds, setOwnerIds] = useState<any>("");
    const [type, setType] = useState("");
    const [openBackDrop, setOpenBackDrop] = React.useState(false);
    const [fileName, setFileName] = useState("");
    const [memberList, setMemberList] = useState<Member[]>([]);

    const handleCloseBackdrop = () => {
        setOpenBackDrop(false);
    };
    const handleToggleBackdrop = () => {
        setOpenBackDrop(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    function upload(formData: FormData) {
        fetch(GlobalParams.baseUrl + '/certificate/add', {
            method: 'post',
            body: formData,
        }).then(response => response.json())
            .then(() => {
                init();
            });
    }


    function handleApply() {
        if (file === "none") {
            alert("请选择一个文件，再上传！");
            return;
        }
        if (type === "") {
            alert("获奖级别不能为空！");
            return;
        }
        if (ownerIds.size === 0) {
            alert("获奖人员不能为空！");
            return;
        }
        let formData = new FormData();
        formData.append("file", file);
        formData.append("name", name);
        formData.append("ownerIds", ownerIds);
        formData.append("type", type);
        upload(formData);
        handleClose();
    }

    const fileInputChange = (event: any) => {
        const newFile = event.target.files[0];
        if (newFile.size >= 1048576 * 10) {
            alert("文件不能大于 10M ");
            return;
        }
        if (newFile.name.split('.').pop().toLowerCase() !== "pdf" &&
            newFile.name.split('.').pop().toLowerCase() !== "jpg" &&
            newFile.name.split('.').pop().toLowerCase() !== "png" &&
            newFile.name.split('.').pop().toLowerCase() !== "jpeg" &&
            newFile.name.split('.').pop().toLowerCase() !== "bmp") {
            alert("上传的文件不是 pdf|jpg|png|jpeg|bmp 形式，系统拒收");
            return;
        }

        setFile(event.target.files[0]);
        setFileName(newFile.name);
    }

    const openInNewTab = (url: string) => {
        // 👇️ setting target to _blank with window.open
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleDownload = (filePath: string) => {
        const url = GlobalParams.baseUrl
            + "/certificate/download/" + filePath
        openInNewTab(url);
    }

    const handleDel = (id: string) => {
        handleToggleBackdrop();
        post("/certificate/delete", {
            token: id,
        }).then((res: any) => {
            console.log(res);
            if (res.status === 200) {
                init();
                handleCloseBackdrop();
            }
        })
    }

    const handleLevel = (level: string) => {
        if (level === "NATION_FIRST") {
            return "国家级一等奖";
        } else if (level === "NATION_SECOND") {
            return "国家级二等奖";
        } else if (level === "NATION_THIRD") {
            return "国家级三等奖";
        } else if (level === "PROVINCE_FIRST") {
            return "省级一等奖";
        } else if (level === "PROVINCE_SECOND") {
            return "省级二等奖";
        } else if (level === "PROVINCE_THIRD") {
            return "省级三等奖";
        } else if (level === "CAMPUS_FIRST") {
            return "校级一等奖";
        } else if (level === "CAMPUS_SECOND") {
            return "校级二等奖";
        } else if (level === "CAMPUS_THIRD") {
            return "校级三等奖";
        } else if (level === "OTHERS") {
            return "其它";
        }
    }

    function init() {
        post("/member/contact", {
            token: localStorage.getItem("v5_token"),
            sessionSelect: "onServe",
            techSelect: "all",
            collegeSelect: "all"
        }).then((res: any) => {
            if (res.status === 200) {
                setMemberList(res.data.contactInfo);
            }
        }).catch(() => {
            alert("登录信息过期，请重新登录");
            navigate("/auth/login");
        })
        post("/certificate/select-all",
            localStorage.getItem("v5_token")).then((res: any) => {
            if (res.status === 200) {
                setRows(res.data);
            }
        }).catch(() => {
            alert("登录信息过期，请重新登录");
            navigate("/auth/login");
        })
    }

    React.useEffect(() => {
        init();
    }, [])

    const level = [
        {
            value: 'NATION_FIRST',
            label: '国家级一等奖',
        },
        {
            value: 'NATION_SECOND',
            label: '国家级二等奖',
        },
        {
            value: 'NATION_THIRD',
            label: '国家级三等奖',
        },
        {
            value: 'PROVINCE_FIRST',
            label: '省级一等奖',
        },
        {
            value: 'PROVINCE_SECOND',
            label: '省级二等奖',
        },
        {
            value: 'PROVINCE_THIRD',
            label: '省级三等奖',
        },
        {
            value: 'CAMPUS_FIRST',
            label: '校级一等奖',
        },
        {
            value: 'CAMPUS_SECOND',
            label: '校级二等奖',
        },
        {
            value: 'CAMPUS_THIRD',
            label: '校级三等奖',
        },
        {
            value: 'OTHERS',
            label: '其它',
        },
    ];

    return (
        <Box>
            <Grid container>
                <Grid xs={10}>
                    <Typography
                        sx={{
                            margin: 3,
                            fontFamily: "黑体",
                            fontWeight: "bold",
                            fontSize: 20,
                        }}
                    >
                        管理奖状
                    </Typography>
                </Grid>
                <Grid xs={2}>
                    <Button
                        sx={{marginTop: 3}}
                        onClick={handleOpen}
                        variant={"contained"}
                    >添加奖状</Button>
                </Grid>
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>新建文章</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        注意！文章必须是以 md 的形式上传，并且文件大小不得大于10Mb，
                        单次最多上传1个文件
                    </DialogContentText>
                    <Stack>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="奖状名称"
                            fullWidth
                            variant="standard"
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                        />
                        <TextField
                            id="奖状级别"
                            select
                            label="奖状级别"
                            sx={{
                                marginY: 2,
                                width: 200,
                            }}
                            value={type}
                            onChange={(event) => {
                                setType(event.target.value);
                            }}
                        >
                            {level.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            options={memberList}
                            getOptionLabel={(option) => option.name}
                            filterSelectedOptions
                            value={owners}
                            onChange={(event, newValue) => {
                                setOwners(newValue);
                                let ids = "";
                                newValue.map((option: Member) => {
                                    ids += option.id + ",";
                                })
                                setOwnerIds(ids);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="获奖人员"
                                />
                            )}
                        />
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
                                hidden accept="text/markdown"
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
                    <Button onClick={handleClose} sx={{marginRight: 3, marginBottom: 3}}>取消</Button>
                    <Button onClick={handleApply} sx={{marginRight: 5, marginBottom: 3}}>上传</Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"}>奖状名称</TableCell>
                            <TableCell align={"center"}>奖状等级</TableCell>
                            <TableCell align={"center"}>获奖时间</TableCell>
                            <TableCell align={"center"}>获奖人员</TableCell>
                            <TableCell align={"center"}>证书下载</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row: any) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row" align={"center"}>
                                    {row.name}
                                </TableCell>
                                <TableCell align={"center"}>{handleLevel(row.type)}</TableCell>
                                <TableCell align={"center"}>{row.date}</TableCell>
                                <TableCell align={"center"}>{row.nameList}</TableCell>
                                <TableCell align={"center"}>
                                    <Button
                                        onClick={() => {
                                            handleDownload(row.filePath);
                                        }}
                                    >
                                        证书下载
                                    </Button>
                                    <Button
                                        color="error"
                                        onClick={() => {
                                            handleDel(row.id);
                                        }}
                                    >
                                        删除证书
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

    );
};

export default PrizeManage;