import {IsDesktop} from "./utils/IsDesktop";
import React, {useEffect, useState} from "react";
import {post} from "./utils/Request";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Paper from "@mui/material/Paper";

export const ContactRows = () => {
    const isDesktop = IsDesktop();

    const [renderRows, setRenderRows] = useState([]);

    function init() {
        let method = "onServe";
        let school = "all";
        let techGroup = "all";
        if (localStorage.getItem("v5_contact_session") === "全部") {
            method = "all";
        } else if (localStorage.getItem("v5_contact_session") === "现役") {
            method = "onServe";
        } else if (localStorage.getItem("v5_contact_session") === "同届次") {
            method = "sameSession";
        }
        if (localStorage.getItem("v5_contact_tech") === "全部") {
            techGroup = "all";
        } else if (localStorage.getItem("v5_contact_tech") === "机械组") {
            techGroup = "mechanic";
        } else if (localStorage.getItem("v5_contact_tech") === "硬件组") {
            techGroup = "hardware";
        } else if (localStorage.getItem("v5_contact_tech") === "软件组") {
            techGroup = "software";
        }
        if (localStorage.getItem("v5_contact_college") === "全部") {
            school = "all";
        } else if (localStorage.getItem("v5_contact_college") === "同学院") {
            school = "sameCollege";
        }
        console.log(method + "," + school + "," + techGroup);
        post("/member/contact",
            {
                id: localStorage.getItem("v5_id"),
                sessionSelect: method,
                techSelect: techGroup,
                collegeSelect: school,
            }).then((res:any) => {
            console.log(res);
            if (res.status === 200) {
                setRenderRows(res.data.contactInfo);
            }
        })
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">姓名</TableCell>
                        <TableCell align="center">届次</TableCell>
                        {isDesktop ? <TableCell align="center">学院</TableCell> : <div/>}
                        {isDesktop ? <TableCell align="center">技术组别</TableCell> : <div/>}
                        {isDesktop ? <TableCell align="center">常住地</TableCell> : <div/>}
                        <TableCell align="center">电话</TableCell>
                        {isDesktop ?
                            <TableCell align="center">邮箱</TableCell>
                            : <div/>}
                        <TableCell align="center">QQ</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        renderRows.map((row:any) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.session}</TableCell>
                                {isDesktop ? <TableCell align="center">{row.college}</TableCell> : <div/>}
                                {isDesktop ? <TableCell align="center">{row.techTeam}</TableCell> : <div/>}
                                {isDesktop ? <TableCell align="center">{row.home}</TableCell> : <div/>}
                                <TableCell align="center">{row.telephone}</TableCell>
                                {isDesktop ? <TableCell align="center">{row.email}</TableCell> : <div/>}
                                <TableCell align="center">{row.qq}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};
