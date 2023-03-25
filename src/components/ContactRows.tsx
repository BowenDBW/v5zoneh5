import {IsDesktop} from "./utils/IsDesktop";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const ContactRows = (props:any) => {

    const {renderRows} = props;
    const isDesktop = IsDesktop();

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
                        renderRows.map((row: any) => (
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
