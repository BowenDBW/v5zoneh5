import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {
    Box,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import colleges from "../../components/utils/Colleges";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDatePicker} from "@mui/x-date-pickers";
import copy from "copy-to-clipboard";
import {post} from "../../components/utils/Request";
import dayjs from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

export default function Registry() {
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

    const split = "·";
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordAgain, setShowPasswordAgain] = useState(false);
    const [birthday, setBirthday] = useState("1970-1-1");
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
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
    const [openBackDrop, setOpenBackDrop] = React.useState(false);

    const handleCloseBackdrop = () => {
        setOpenBackDrop(false);
    };
    const handleToggleBackdrop = () => {
        setOpenBackDrop(true);
    };

    const handleClickShowPassword = () =>
        setShowPassword((show) => !show);
    const handleClickShowPasswordAgain = () =>
        setShowPasswordAgain((show) => !show);
    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    const handleMouseDownPasswordAgain = (event: any) => {
        event.preventDefault();
    };

    const getFileType = (fileName: string) => {
        const suffix = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
        if (suffix === "md") {
            return "md";
        } else if (suffix === "pdf") {
            return "pdf";
        } else if (suffix === "html") {
            return "html";
        } else {
            return "";
        }
    }

    const validate = () => {
        if (!/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(name)) {
            alert("姓名格式有问题， 应为2-20位汉字或包含英文标点：·");
            return false;
        }
        if (!/^\d{10}$/.test(id)) {
            alert("学号格式有误，应为10位数字");
            return false;
        }
        if (!/^\d{6}$/.test(code)) {
            alert("验证码格式有误，应为6位数字");
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
        if (password === "") {
            alert("密码不的为空，请设置密码");
            return false;
        }
        if (!(password === passwordAgain)) {
            alert("两次密码不一致，请检查后再注册");
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


    const register = () => {
        handleToggleBackdrop();
        if (!validate()) {
            handleCloseBackdrop();
            return;
        }
        localStorage.setItem("v5_token", "undefined");
        post("/auth/register", {
            id: id,
            name: name,
            code: code,
            password: password,
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
        }).then(((res: any) => {
            if (res.status === 200) {
                if (res.data.msg === "success") {
                    alert("注册成功，点击确认返回登录页");
                    navigate("/auth/login");
                } else {
                    alert(res.data.msg);
                }
                handleCloseBackdrop();
            }
        })).catch(()=>{
            alert("注册失败，清联系管理员");
            handleCloseBackdrop();
        })
    }

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 200,
                width: 250,
            },
        },
    };

    return (
        <Box
            sx={{
                width: 1160,
                height: 600,
                backgroundColor: '#ffffff',
                opacity: 0.85,
                borderRadius: 5,
            }}
        >
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={openBackDrop}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Box sx={{
                marginRight: 2
            }}>
                <Typography
                    sx={{
                        margin: 3,
                        textAlign: "center",
                        fontFamily: "font5",
                        fontSize: 28,
                    }}
                >
                    <img src={require("../../assets/imgs/v5logo.png")}
                         style={{
                             width: 70,
                             height: 30,
                             marginRight: 10,
                         }}
                         alt={'v5logo'}>
                    </img>
                    V5 Zone 注册
                </Typography>
            </Box>
            <Grid container spacing={1}>
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
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />
                </Grid>

                <Grid xs={3}>
                    <TextField
                        required
                        id="outlined-required"
                        label="注册邀请码"
                        sx={{
                            marginX: 3,
                            marginBottom: 3,
                            height: 30
                        }}
                        value={code}
                        onChange={(event) => {
                            setCode(event.target.value);
                        }}
                    />
                </Grid>

                <Grid xs={3}>
                    <FormControl
                        required={true}
                        sx={{
                            marginX: 3,
                            marginBottom: 3,
                            height: 30,
                        }}
                        variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">设置密码</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >{showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="设置密码"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={3}>
                    <FormControl
                        required={true}
                        sx={{
                            marginX: 3,
                            marginBottom: 3,
                            height: 30
                        }}
                        variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">再次输入密码</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPasswordAgain ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPasswordAgain}
                                        onMouseDown={handleMouseDownPasswordAgain}
                                        edge="end"
                                    >{showPasswordAgain ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="再次输入密码"
                            value={passwordAgain}
                            onChange={(event) => {
                                setPasswordAgain(event.target.value);
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={3}>
                    <TextField
                        required
                        id="outlined-required"
                        label="学号"
                        sx={{
                            margin: 3,
                            height: 30
                        }}
                        value={id}
                        onChange={(event) => {
                            setId(event.target.value);
                        }}
                    />
                </Grid>

                <Grid xs={3}>
                    <TextField
                        required
                        id="outlined-required"
                        label="届次"
                        sx={{
                            margin: 3,
                            height: 30
                        }}
                        value={session}
                        onChange={(event) => {
                            setSession(event.target.value);
                        }}
                    />
                </Grid>

                <Grid xs={3}>
                    <FormControl
                        sx={{
                            marginTop: 3,
                            width: "82%",
                            marginLeft: 3,
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
                            margin: 3,
                            height: 30,
                        }}
                        value={major}
                        onChange={(event) => {
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
                            width: "81%",
                            marginLeft: 3,
                        }}
                        value={techGroup}
                        onChange={(event) => {
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
                        onChange={(event) => {
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
                        onChange={(event) => {
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
                        onChange={(event) => {
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
                        onChange={(event) => {
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
                            width: "81%",
                            marginLeft: 3,
                        }}
                        value={sex}
                        onChange={(event) => {
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
                                onChange={(event) => {
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
                        onChange={(event) => {
                            setFoodHabit(event.target.value);
                        }}
                    />
                </Grid>

                <Grid xs={3} sx={{
                    marginLeft: 3,
                    marginTop: 3,
                }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="出生日期"
                            value={dayjs(birthday)}
                            onChange={(newValue: any) => {
                                setBirthday(newValue.format('YYYY-MM-DD'));
                            }}
                        />
                    </LocalizationProvider>
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
                        onChange={(event) => {
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
                        onChange={(event) => {
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
                        onChange={(event) => {
                            setHighSchool(event.target.value);
                        }}
                    />
                </Grid>

                <Grid xs={4}>
                    <Button
                        sx={{
                            margin: 3,
                            textAlign: "center",
                            fontWeight: "bold",
                        }}
                        variant="outlined"
                        onClick={() => {
                            post("/config/get", "privacy_rules_path")
                                .then((res: any) => {
                                    navigate("/auth/"
                                        + getFileType(res.data.msg)
                                        + "?fileLink="
                                        + res.data.msg
                                        + "&isOutside=false");
                                });
                        }}
                    > V5 隐私政策
                    </Button>
                </Grid>
                <Grid xs={4}
                      sx={{
                          textAlign: "center"
                      }}
                >
                    <Button
                        sx={{
                            margin: 3,
                            textAlign: "center",
                        }}
                        variant="contained"
                        onClick={register}
                    > 确认并注册
                    </Button>
                    <Button
                        sx={{
                            margin: 3,
                            textAlign: "center",
                            fontWeight: "bold",
                        }}
                        variant="outlined"
                        onClick={() => {
                            navigate('/auth/login');
                        }}
                    >返回
                    </Button>
                </Grid>
                <Grid xs={4}>
                </Grid>
            </Grid>
        </Box>
    );
};
