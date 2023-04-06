import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {post} from "../../components/utils/Request";
import {useNavigate} from "react-router-dom";
import {Button, Typography} from "@mui/material";
import GlobalParams from "../../GlobalParams";
import {IsDesktop} from "../../components/utils/IsDesktop";
import Global from "../../GlobalParams";

const Prize = () => {


    const navigate = useNavigate();
    const [rows, setRows] = React.useState([]);

    const openInNewTab = (url: string) => {
        // 👇️ setting target to _blank with window.open
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleDownload = (filePath:string) => {
        const url = GlobalParams.baseUrl
            + "/certificate/download/" + filePath
        openInNewTab(url);
    }

    function init() {
        post("/certificate/select-by-id",
            localStorage.getItem("v5_token")).then((res:any) => {
            if (res.status === 200) {
                setRows(res.data);
            }
        }).catch(() => {
            alert("登录信息过期，请重新登录");
            navigate("/auth/login");
        })
    }

    const handleLevel = (level:string) => {
        if(level === "NATION_FIRST"){
            return "国家级一等奖";
        }else if(level === "NATION_SECOND"){
            return "国家级二等奖";
        }else if(level === "NATION_THIRD"){
            return "国家级三等奖";
        }else if(level === "PROVINCE_FIRST"){
            return "省级一等奖";
        }else if(level === "PROVINCE_SECOND"){
            return "省级二等奖";
        }else if(level === "PROVINCE_THIRD"){
            return "省级三等奖";
        }else if(level === "CAMPUS_FIRST"){
            return "校级一等奖";
        }else if(level === "CAMPUS_SECOND"){
            return "校级二等奖";
        }else if(level === "CAMPUS_THIRD"){
            return "校级三等奖";
        }else if(level === "OTHERS"){
            return "其它";
        }
    }

    React.useEffect(()=>{
        init();
    },[])

    return (
        <Box>
            {Global.isDesktop ? <div/> :
                <Typography
                    align="center"
                    sx={{
                        fontFamily: "黑体",
                        fontSize: 20,
                        fontWeight: "bold",
                        height: 32,
                        marginTop: 2
                    }}
                >
                    Zone 留言板
                </Typography>
            }
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"}>奖状名称</TableCell>
                            <TableCell align={"center"}>奖状等级</TableCell>
                            <TableCell align={"center"}>获奖时间</TableCell>
                            <TableCell align={"center"}>证书下载</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row:any) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align={"center"}>
                                    {row.name}
                                </TableCell>
                                <TableCell align={"center"}>{handleLevel(row.type)}</TableCell>
                                <TableCell align={"center"}>{row.date}</TableCell>
                                <TableCell align={"center"}>
                                    <Button
                                        onClick={()=>{
                                            handleDownload(row.filePath);
                                        }}
                                    >
                                        证书下载
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

export default Prize;
