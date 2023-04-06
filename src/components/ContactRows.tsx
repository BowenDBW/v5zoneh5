import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {deepOrange} from "@mui/material/colors";
import React from "react";
import {post} from "./utils/Request";
import GlobalParams from "../GlobalParams";
import Typography from "@mui/material/Typography";
import Global from "../GlobalParams";

const MemberAvatar = (props:any) => {

    const {name, id} = props;
    const [avatar, setAvatar] = React.useState("null");

    const init = () => {
        post("/auth/get-avatar",
            {token: id})
            .then((res:any) => {
                setAvatar(GlobalParams.baseUrl + "/album/download/" + res.data);
            });
    }

    React.useEffect(()=>{
        init();
    },[])

    return(
        <Box>
            {avatar === "null" ?
                <Avatar sx={{bgcolor: deepOrange[500]}}>{name[0]}</Avatar>
                :
                <Avatar
                    sx={{color:"#000000",borderStyle:"solid", borderWidth:"1px"}}
                    src={avatar}
                    sizes={"small"}
                />
            }
        </Box>
    )
}

export const ContactRows = (props:any) => {

    const {renderRows} = props;


    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">姓名</TableCell>
                        <TableCell align="center">届次</TableCell>
                        {Global.isDesktop ? <TableCell align="center">学院</TableCell> : <div/>}
                        {Global.isDesktop ? <TableCell align="center">技术组别</TableCell> : <div/>}
                        {Global.isDesktop ? <TableCell align="center">常住地</TableCell> : <div/>}
                        <TableCell align="center">电话</TableCell>
                        {Global.isDesktop ?
                            <TableCell align="center">邮箱</TableCell>
                            : <div/>}
                        <TableCell align="center">QQ</TableCell>
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
                                    <Stack direction="row">
                                        <MemberAvatar name={row.name} id={row.id}/>
                                        <Typography sx={{margin:1}}>
                                            {row.name}
                                        </Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell align="center">{row.session}</TableCell>
                                {Global.isDesktop ? <TableCell align="center">{row.college}</TableCell> : <div/>}
                                {Global.isDesktop ? <TableCell align="center">{row.techTeam}</TableCell> : <div/>}
                                {Global.isDesktop ? <TableCell align="center">{row.home}</TableCell> : <div/>}
                                <TableCell align="center">{row.telephone}</TableCell>
                                {Global.isDesktop ? <TableCell align="center">{row.email}</TableCell> : <div/>}
                                <TableCell align="center">{row.qq}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};
