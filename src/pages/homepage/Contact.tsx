import {
    Box,
    Grid,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import React from 'react';
import {useNavigate} from "react-router-dom";
import {IsDesktop} from "../../components/utils/IsDesktop";
import {ContactRows} from "../../components/ContactRows";
import {post} from "../../components/utils/Request";
import Global from "../../GlobalParams";

const Contact = () => {


    const navigate = useNavigate();
    const [renderRows, setRenderRows] = React.useState([]);

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
                token: localStorage.getItem("v5_token"),
                sessionSelect: method,
                techSelect: techGroup,
                collegeSelect: school,
            }).then((res: any) => {
            console.log(res);
            if (res.status === 200) {
                setRenderRows(res.data.contactInfo);
            }
        }).catch(() => {
            alert("登录信息过期，请重新登录");
            navigate("/auth/login");
        })
    }

    React.useEffect(() => {
        init();
    }, [])

    const method = [
        {
            value: '全部',
            label: '全部',
        },
        {
            value: '现役',
            label: '现役',
        },
        {
            value: '同届次',
            label: '同届次',
        },
    ];

    const school = [
        {
            value: '全部',
            label: '全部',
        },
        {
            value: '同学院',
            label: '同学院',
        },
    ];

    const techGroup = [
        {
            value: '全部',
            label: '全部',
        },
        {
            value: '软件组',
            label: '软件组',
        },
        {
            value: '硬件组',
            label: '硬件组',
        },
        {
            value: '机械组',
            label: '机械组',
        },
    ];

    const onTechGroupChanged = (event: any) => {
        localStorage.setItem("v5_contact_tech", event.target.value);
        init();
    }

    const onSchoolChanged = (event: any) => {
        localStorage.setItem("v5_contact_college", event.target.value);
        init();
    }

    const onMethodChanged = (event: any) => {
        localStorage.setItem("v5_contact_session", event.target.value);
        init();
    }

    return (
        <Box>
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
                    >组员联系方式</Typography>
                }
                <Grid container spacing={1} sx={{textAlign: "center", margin: 2}}>
                    <Grid xs={4}>
                        <TextField
                            id="届次筛选"
                            select
                            label="届次筛选"
                            defaultValue={localStorage
                                .getItem("v5_contact_session")}
                            size="small"
                            sx={{
                                margin: 2,
                            }}
                            onChange={onMethodChanged}
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
                            id="学院筛选"
                            select
                            label="学院筛选"
                            defaultValue={localStorage
                                .getItem("v5_contact_college")}
                            size="small"
                            sx={{
                                margin: 2,
                            }}
                            onChange={onSchoolChanged}
                        >
                            {school.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid xs={4}>
                        <TextField
                            id="技术组别"
                            select
                            label="技术组别"
                            defaultValue={localStorage
                                .getItem("v5_contact_tech")}
                            size="small"
                            sx={{
                                margin: 2,
                            }}
                            onChange={onTechGroupChanged}
                        >
                            {techGroup.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
            </Box>
            <ContactRows renderRows={renderRows}/>
        </Box>
    );
};

export default Contact;
