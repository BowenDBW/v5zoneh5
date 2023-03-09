import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import colleges from "../utils/Colleges";
import {post} from "../utils/Request";
import {
    Box,
    Grid,
    MenuItem,
    Select,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import copy from "copy-to-clipboard";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";

interface SimpleDialogProps {
    open: boolean,
    setOpen: Function,
}

const ProfileDesktop:React.FC<SimpleDialogProps> = (props) => {

    const {open, setOpen} = props;

    const sexItem = [
        {
            label: "男",
            value: "男",
        },
        {
            label: "女",
            value: "女",
        },
    ]

    const techGroupItem = [
        {
            label: "软件组",
            value: "软件组",
        },
        {
            label: "硬件组",
            value: "硬件组",
        },
        {
            label: "机械组",
            value: "机械组",
        },
    ]

    const navigate = useNavigate();
    const collegeItem = colleges;

    const split:any = "·";
    const [birthday, setBirthday] =  React.useState<Dayjs | null>(dayjs('1970-1-1'));
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [session, setSession] = useState("");
    const [college, setCollege] = useState("");
    const [major, setMajor] = useState("");
    const [techGroup, setTechGroup] = useState("");
    const [telephone, setTelephone] = useState("");
    const [email, setEmail] = useState("");
    const [qq, setQq] = useState("");
    const [idCard, setIdCard] = useState("");
    const [sex, setSex] = useState("");
    const [nation, setNation] = useState("");
    const [foodHabit, setFoodHabit] = useState("");
    const [hometown, setHometown] = useState("");
    const [residence, setResidence] = useState("");
    const [highSchool, setHighSchool] = useState("");

    function validate() {
        if (!/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(name)) {
            alert("姓名格式有问题， 应为2-20位汉字或包含英文标点：·");
            return false;
        }
        if (!/^\d{10}$/.test(id)) {
            alert("学号格式有误，应为10位数字");
            return false;
        }
        if (!/^\d{4}$/.test(session)) {
            alert("届次格式有误，应为4位数字");
            return false;
        }
        if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)) {
            alert("邮箱格式有误，应为 xxx@xx.com");
            return false;
        }
        if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(telephone)) {
            alert("手机号码格式有误，应为 1开头;3,4,5,7,8作为第二位的11位数字");
            return false;
        }
        if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard)) {
            alert("身份证号格式有误，应为 15位一代身份证和18位二代身份证");
            return false;
        }
        if (foodHabit === "") {
            alert("饮食习惯不得为空，无禁忌请填无");
            return false;
        }
        if (birthday === dayjs('1970-1-1')) {
            alert("请检查生日信息，1970-1-1 是不被允许的日期");
            return false;
        }
        if (college === "") {
            alert("学院不得为空，请选择自己的学院");
            return false;
        }
        if (major === "") {
            alert("专业不得为空，请选择自己的专业，没有请填 DL");
            return false;
        }
        if (sex === "") {
            alert("性别不得为空，请选择自己的性别");
            return false;
        }
        if (college === "") {
            alert("学院不得为空，请选择自己的学院");
            return false;
        }
        if (techGroup === "") {
            alert("技术组别不得为空，请选择自己的技术组别");
            return false;
        }
        if (!/^[\u4E00-\u9FA5\uf900-\ufa2d]{2,32}$/.test(hometown)) {
            alert("户籍格式有误，应为 2-32位汉字");
            return false;
        }
        if (!/^[\u4E00-\u9FA5\uf900-\ufa2d]{2,32}$/.test(residence)) {
            alert("常驻地格式有误，应为 2-32位汉字");
            return false;
        }
        if (!/^[\u4E00-\u9FA5\uf900-\ufa2d]{2,32}$/.test(highSchool)) {
            alert("生源高中格式有误，应为 2-32位汉字");
            return false;
        }
        if (!/^[\u4E00-\u9FA5\uf900-\ufa2d]{1,4}$/.test(nation)) {
            alert("民族格式有误，应为 1-4位汉字");
            return false;
        }
        if (!/^[1-9]\d{4,12}$/.test(qq)) {
            alert("QQ格式有误，应为 4 - 12位数字");
        }
        return true;
    }

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 200,
                width: 250,
            },
        },
    };

    function init() {
        post("/member/get-member",
            localStorage.getItem("v5_token")
        ).then(((res:any) => {
            if (res.status === 200) {
                setQq(res.data.qqId);
                setId(res.data.id);
                setName(res.data.name);
                setTelephone(res.data.telephone);
                setEmail(res.data.email);
                setIdCard(res.data.idCard);
                setCollege(res.data.college);
                setMajor(res.data.major);
                setHometown(res.data.homeTown);
                setResidence(res.data.residence);
                setSession(res.data.session);
                setHighSchool(res.data.highSchool);
                setFoodHabit(res.data.foodHabit);
                setBirthday(res.data.birthday);
                setTechGroup(res.data.techGroup);
                if (res.data.sex === "FEMALE") {
                    setSex("女");
                } else {
                    setSex("男");
                }
                if (res.data.techGroup === "MECHANIC") {
                    setTechGroup("机械组");
                } else if (res.data.techGroup === "HARDWARE") {
                    setTechGroup("硬件组");
                } else {
                    setTechGroup("软件组");
                }
                setNation(res.data.nation
                    .substring(0, res.data.nation.length - 1));
            }
        }))
    }

    useEffect(() => {
        init();
    }, [])

    function onClickConfirm() {
        if (!validate()) {
            return;
        }
        post("/member/update", {
            id: id,
            name: name,
            telephone: telephone,
            email: email,
            qq: qq,
            idCard: idCard,
            college: college,
            major: major,
            hometown: hometown,
            residence: residence,
            session: session,
            highSchool: highSchool,
            foodHabit: foodHabit,
            birthday: birthday,
            techGroup: techGroup,
            sex: sex,
            nation: nation,
        }).then(((res:any) => {
            if (res.status === 200) {
                if (res.data.msg === "success") {
                    alert("修改成功");
                } else {
                    alert(res.data.msg);
                }
            }
        }))
    }

    function handleClose(){
        setOpen(false);
    }

    function handleSetProfile(){

    }

    // @ts-ignore
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"V5Zone ICP信息"}
            </DialogTitle>
            <DialogContent>
                <Box>
                    <Typography
                        align="center"
                        sx={{
                            fontFamily: "黑体",
                            fontSize: 20,
                            fontWeight: "bold",
                            height: 32,
                            marginTop: 2
                        }}
                    >我的个人信息</Typography>
                    <Grid container spacing={1}>
                        <Grid xs={4}></Grid>
                        <Grid xs={4} sx={{textAlign: "center"}}>

                            <TextField
                                disabled={true}
                                aria-readonly={true}
                                id="outlined-required"
                                label="学号"
                                sx={{
                                    margin: 4,
                                    height: 30,
                                }}
                                value={id}
                            />

                        </Grid>
                        <Grid xs={3} sx={{
                            textAlign: "right",
                            margin: 1,
                        }}>
                            <Button
                                sx={{
                                    margin: 3,
                                    fontWeight: "bold",
                                }}
                                variant="outlined"
                                onClick={() => {
                                    navigate("/homepage/md?fileLink=Privacy.md&darkMode=false");
                                }}
                            > V5 隐私政策
                            </Button>
                        </Grid>
                        <Grid xs={4}>
                            <Button
                                sx={{
                                    marginX: 3,
                                    textAlign: "center",
                                    fontSize: 14
                                }}
                                variant="text"
                                onClick={() => {
                                    copy(split)
                                }}
                            > 点击复制少数民族姓名分隔标点
                            </Button>
                        </Grid>
                        <Grid xs={8}></Grid>
                        <Grid xs={3}>
                            <TextField
                                required
                                id="outlined-required"
                                label="姓名"
                                sx={{
                                    marginX: 3,
                                    marginBottom: 3,
                                    height: 30
                                }}
                                value={name}
                                onChange={(event:any) => {
                                    setName(event.target.value);
                                }}
                            />
                        </Grid>

                        <Grid xs={3}>
                            <TextField
                                required
                                id="outlined-required"
                                label="届次"
                                sx={{
                                    marginX: 3,
                                    height: 30
                                }}
                                value={session}
                                onChange={(event:any) => {
                                    setSession(event.target.value);
                                }}
                            />
                        </Grid>

                        <Grid xs={3}>
                            <FormControl
                                sx={{
                                    width: 240,
                                    marginX: 3,
                                }}
                            >
                                <InputLabel id="demo-multiple-name-label">
                                    学院
                                </InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    value={college}
                                    onChange={(event) => {
                                        setCollege(event.target.value);
                                    }}
                                    input={<OutlinedInput label="Name"/>}
                                    MenuProps={MenuProps}
                                >
                                    {collegeItem.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid xs={3}>
                            <TextField
                                required
                                id="outlined-required"
                                label="专业（没有填DL）"
                                sx={{
                                    marginX: 3,
                                    height: 30,
                                }}
                                value={major}
                                onChange={(event:any) => {
                                    setMajor(event.target.value);
                                }}
                            />
                        </Grid>

                        <Grid xs={3}>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="技术组别"
                                sx={{
                                    marginTop: 3,
                                    width: 240,
                                    marginLeft: 3,
                                }}
                                value={techGroup}
                                onChange={(event:any) => {
                                    setTechGroup(event.target.value);
                                }}
                            >
                                {techGroupItem.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}

                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid xs={3}>
                            <TextField
                                required
                                id="outlined-required"
                                label="电话"
                                sx={{
                                    margin: 3,
                                    height: 30
                                }}
                                value={telephone}
                                onChange={(event:any) => {
                                    setTelephone(event.target.value);
                                }}
                            />
                        </Grid>

                        <Grid xs={3}>
                            <TextField
                                required
                                id="outlined-required"
                                label="邮箱"
                                sx={{
                                    margin: 3,
                                    height: 30
                                }}
                                value={email}
                                onChange={(event:any) => {
                                    setEmail(event.target.value);
                                }}
                            />
                        </Grid>

                        <Grid xs={3}>
                            <TextField
                                required
                                id="outlined-required"
                                label="QQ"
                                sx={{
                                    margin: 3,
                                    height: 30
                                }}
                                value={qq}
                                onChange={(event:any) => {
                                    setQq(event.target.value);
                                }}
                            />
                        </Grid>

                        <Grid xs={3}>
                            <TextField
                                id="outlined-required"
                                label="身份证号（用于报名比赛）"
                                sx={{
                                    margin: 3,
                                    height: 30
                                }}
                                value={idCard}
                                onChange={(event:any) => {
                                    setIdCard(event.target.value);
                                }}
                            />
                        </Grid>

                        <Grid xs={3}>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="性别"
                                sx={{
                                    marginTop: 3,
                                    width: 240,
                                    marginLeft: 3,
                                }}
                                value={sex}
                                onChange={(event:any) => {
                                    setSex(event.target.value);
                                }}
                            >
                                {sexItem.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}

                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid xs={3}>
                            <Grid container spacing={1}
                                  sx={{
                                      textAlign: "center",
                                      margin: 3,
                                      marginLeft: 3,
                                      height: 30,
                                  }}>
                                <Grid xs={6}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="民族"
                                        value={nation}
                                        onChange={(event:any) => {
                                            setNation(event.target.value);
                                        }}
                                    />
                                </Grid>
                                <Grid xs={6}>
                                    <Typography
                                        sx={{
                                            textAlign: "left",
                                            marginTop: 2,
                                            marginLeft: 2,
                                            fontSize: 20,
                                        }}
                                    >族</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid xs={3}>
                            <TextField
                                required
                                id="outlined-required"
                                label="饮食习惯（无禁忌填“正常”）"
                                sx={{
                                    margin: 3,
                                    height: 30
                                }}
                                value={foodHabit}
                                onChange={(event:any) => {
                                    setFoodHabit(event.target.value);
                                }}
                            />
                        </Grid>

                        <Grid xs={3} sx={{
                            marginLeft: 3,
                            marginTop: 3,
                        }}>

                            {/*<DatePicker*/}
                            {/*    label="出生日期"*/}
                            {/*    value={birthday}*/}
                            {/*    onChange={(newValue:any) => {*/}
                            {/*        if (newValue.toString() === "Invalid Date") {*/}
                            {/*            alert("请点击图标更改此栏位");*/}
                            {/*        }*/}
                            {/*        setBirthday(newValue.format('YYYY-MM-DD'));*/}
                            {/*    }}*/}
                            {/*/>*/}
                        </Grid>

                        <Grid xs={3}>
                            <TextField
                                required
                                id="outlined-required"
                                label="籍贯(xx省xx市)"
                                sx={{
                                    marginY: 3,
                                    height: 30
                                }}
                                value={hometown}
                                onChange={(event:any) => {
                                    setHometown(event.target.value);
                                }}
                            />
                        </Grid>

                        <Grid xs={3}>
                            <TextField
                                required
                                id="outlined-required"
                                label="常住地(xx省xx市)"
                                sx={{
                                    marginY: 3,
                                    height: 30
                                }}
                                value={residence}
                                onChange={(event:any) => {
                                    setResidence(event.target.value);
                                }}
                            />
                        </Grid>

                        <Grid xs={2.5}>
                            <TextField
                                required
                                id="outlined-required"
                                label="生源高中"
                                sx={{
                                    marginY: 3,
                                    height: 30
                                }}
                                value={highSchool}
                                onChange={(event:any) => {
                                    setHighSchool(event.target.value);
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSetProfile}>
                    确认修改
                </Button>
                <Button onClick={handleClose}>
                    返回
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProfileDesktop;
