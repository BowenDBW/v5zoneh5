import {Box, Grid, MenuItem, TextField, Typography} from '@mui/material';
import React from 'react';
import {useNavigate} from "react-router-dom";
import {IsDesktop} from "../../components/utils/IsDesktop";
import {ContactRows} from "../../components/ContactRows";

const Contact = () => {

    const isDesktop = IsDesktop();
    const navigate = useNavigate();

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
        navigate(0);
    }

    const onSchoolChanged = (event: any) => {
        localStorage.setItem("v5_contact_college", event.target.value);
        navigate(0);
    }

    const onMethodChanged = (event: any) => {
        localStorage.setItem("v5_contact_session", event.target.value);
        navigate(0);
    }

    return (
        <Box>
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
                                margin: 2
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
                                margin: 2
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
                                margin: 2
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
            <ContactRows/>
        </Box>
    );
};

export default Contact;
