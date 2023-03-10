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
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
} from "@mui/material";
import copy from "copy-to-clipboard";
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

interface SimpleDialogProps {
    open: boolean,
    setOpen: Function,

    setMenuClose:Function,
}

const ProfileDesktop: React.FC<SimpleDialogProps> = (props) => {

    const {open, setOpen, setMenuClose} = props;

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

    const [openBackDrop, setOpenBackDrop] = React.useState(false);

    const handleCloseBackdrop = () => {
        setOpenBackDrop(false);
    };
    const handleToggleBackdrop = () => {
        setOpenBackDrop(true);
    };

    const split: any = "·";
    const [birthday, setBirthday] = React.useState("1970-1-1");
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
        if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(telephone)) {
            alert("手机号码格式有误，应为 1开头;3,4,5,7,8,9作为第二位的11位数字");
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
        if (birthday === "1970-1-1") {
            alert("请检查生日信息，不允许为默认值");
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
        handleToggleBackdrop();
        post("/member/get-member",
            localStorage.getItem("v5_token")
        ).then(((res: any) => {
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
        handleCloseBackdrop();
    }

    useEffect(() => {
        init();
    }, [])

    function handleClose() {
        setMenuClose();
        setOpen(false);
    }

    function handleSetProfile() {
        handleToggleBackdrop();
        if (!validate()) {
            handleCloseBackdrop();
            return;
        }
        post("/member/update", {
            id: localStorage.getItem("v5_token"),
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
                    handleClose();
                } else {
                    alert(res.data.msg);
                }
            }
        }))
        handleCloseBackdrop();
    }

    // @ts-ignore
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackDrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <DialogTitle id="alert-dialog-title" sx={{fontWeight:"bold", textAlign:"center"}}>
                我的个人信息
            </DialogTitle>
            <DialogContent>
                <Box>
                    <Grid container spacing={1}>
                        {/*row 1*/}
                        <Grid xs={6} sx={{textAlign: "center"}}>
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
                        <Grid xs={5} sx={{
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

                        {/*row 2*/}
                        <Grid xs={6}>
                            <Button
                                sx={{
                                    marginX: 3,
                                    marginTop: 1,
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
                        <Grid xs={6}/>

                        {/*row 2*/}
                        <Grid xs={6}>
                            <TextField
                                required
                                id="outlined-required"
                                label="姓名"
                                sx={{
                                    marginX: 3,
                                    marginBottom: 6,
                                    height: 30
                                }}
                                value={name}
                                onChange={(event: any) => {
                                    setName(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid xs={6}>
                            <TextField
                                required
                                id="outlined-required"
                                label="届次"
                                sx={{
                                    marginX: 3,
                                    height: 30
                                }}
                                value={session}
                                onChange={(event: any) => {
                                    setSession(event.target.value);
                                }}
                            />
                        </Grid>

                        {/*row 3*/}
                        <Grid xs={6}>
                            <FormControl
                                sx={{
                                    width: 225,
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
                        <Grid xs={6}>
                            <TextField
                                required
                                id="outlined-required"
                                label="专业（没有填DL）"
                                sx={{
                                    marginX: 3,
                                    height: 30,
                                }}
                                value={major}
                                onChange={(event: any) => {
                                    setMajor(event.target.value);
                                }}
                            />
                        </Grid>

                        {/*row 4*/}
                        <Grid xs={6}>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="技术组别"
                                sx={{
                                    marginTop: 3,
                                    width: 225,
                                    marginX: 3,
                                }}
                                value={techGroup}
                                onChange={(event: any) => {
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
                        <Grid xs={6}>
                            <TextField
                                required
                                id="outlined-required"
                                label="电话"
                                sx={{
                                    margin: 3,
                                    height: 30
                                }}
                                value={telephone}
                                onChange={(event: any) => {
                                    setTelephone(event.target.value);
                                }}
                            />
                        </Grid>

                        {/*row 5*/}
                        <Grid xs={6}>
                            <TextField
                                required
                                id="outlined-required"
                                label="邮箱"
                                sx={{
                                    margin: 3,
                                    height: 30
                                }}
                                value={email}
                                onChange={(event: any) => {
                                    setEmail(event.target.value);
                                }}
                            />
                        </Grid>

                        <Grid xs={6}>
                            <TextField
                                required
                                id="outlined-required"
                                label="QQ"
                                sx={{
                                    margin: 3,
                                    height: 30
                                }}
                                value={qq}
                                onChange={(event: any) => {
                                    setQq(event.target.value);
                                }}
                            />
                        </Grid>

                        {/*row 6*/}
                        <Grid xs={8}>
                            <TextField
                                id="outlined-required"
                                label="身份证号（用于报名比赛）"
                                sx={{
                                    margin: 3,
                                    height: 30,
                                    width: "80%",
                                }}
                                value={idCard}
                                onChange={(event: any) => {
                                    setIdCard(event.target.value);
                                }}
                            />
                        </Grid>

                        <Grid xs={4}>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="性别"
                                sx={{
                                    margin: 3,
                                    width: 130,
                                    marginX: 3,
                                }}
                                value={sex}
                                onChange={(event: any) => {
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

                        <Grid xs={6}>
                            <FormControl
                                sx={{
                                    marginBottom: 3,
                                    marginX: 3,
                                    height: 30}}
                            >
                                <InputLabel htmlFor="outlined-adornment-password">民族</InputLabel>
                                <OutlinedInput
                                    label="民族"
                                    id="outlined-required"
                                    endAdornment={<InputAdornment position="end">族</InputAdornment>}
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                    required
                                    value={nation}
                                    onChange={(event: any) => {
                                        setNation(event.target.value);
                                    }}

                                />
                            </FormControl>
                        </Grid>

                        <Grid xs={6}>
                            <TextField
                                required
                                id="outlined-required"
                                label="饮食习惯（无禁忌填“正常”）"
                                sx={{
                                    marginBottom: 3,
                                    marginX: 3,
                                    height: 30
                                }}
                                value={foodHabit}
                                onChange={(event: any) => {
                                    setFoodHabit(event.target.value);
                                }}
                            />
                        </Grid>

                        <Grid xs={6}>
                            <TextField
                                required
                                id="outlined-required"
                                label="籍贯(xx省xx市)"
                                sx={{
                                    margin: 3,
                                    height: 30
                                }}
                                value={hometown}
                                onChange={(event: any) => {
                                    setHometown(event.target.value);
                                }}
                            />
                        </Grid>

                        <Grid xs={6}>
                            <TextField
                                required
                                id="outlined-required"
                                label="常住地(xx省xx市)"
                                sx={{
                                    margin: 3,
                                    height: 30
                                }}
                                value={residence}
                                onChange={(event: any) => {
                                    setResidence(event.target.value);
                                }}
                            />
                        </Grid>

                        <Grid xs={5} sx={{
                            marginX: 3,
                            marginTop: 3,
                        }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    label="出生日期"
                                    value={dayjs(birthday)}
                                    onChange={(newValue: any) => {
                                        setBirthday(newValue.toString());
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid xs={5.9}>
                            <TextField
                                required
                                id="outlined-required"
                                label="生源高中"
                                sx={{
                                    margin: 3,
                                    height: 30
                                }}
                                value={highSchool}
                                onChange={(event: any) => {
                                    setHighSchool(event.target.value);
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions sx={{justifyContent:"center"}}>
                <Button
                    variant="contained"
                    onClick={handleSetProfile}
                    size="large"
                    sx={{fontWeight: "bold", marginX: 2}}
                >
                    确认修改
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleClose}
                    size="large"
                    sx={{fontWeight: "bold", marginX: 2}}
                >
                    返回
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProfileDesktop;
