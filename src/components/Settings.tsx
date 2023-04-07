import React from 'react';
import {get, post} from "./utils/Request";
import {useNavigate} from "react-router-dom";
import {Box, Button, Divider, Stack} from "@mui/material";
import TextField from "@mui/material/TextField";

const SettingRow = (props: any) => {

    const {configKey, configValue, description, init} = props;

    const [itemValue, setItemValue] = React.useState(configValue);

    return (
        <Box alignItems={"center"}>
            <TextField
                id="outlined-required"
                defaultValue={itemValue}
                label={description}
                value={itemValue}
                sx={{
                    margin: 3,
                    height: 40,
                    width: 400,
                }}
                onChange={(event) => {
                    setItemValue(event.target.value);
                }}
            />
            <Button
                variant={"contained"}
                sx={{
                    marginTop: 4,
                    fontSize: 16
                }}
                onClick={() => {
                    post("/config/set-setting", {
                        token: configKey,
                        message: itemValue,
                    }).then((res: any) => {
                        if (res.status === 200) {
                            init();
                            alert("更新成功");
                        }
                    })
                }}
            >
                更新信息
            </Button>
        </Box>
    )
}

const Settings = () => {

    const navigate = useNavigate();
    const [settings, setSettings] = React.useState([]);

    const init = () => {
        get("/config/get-all-settings").then((res: any) => {
            if (res.status === 200) {
                setSettings(res.data);
            }
        }).catch(() => {
            alert("登录信息过期，请重新登录");
            navigate("/auth/login");
        })
    }

    React.useEffect(() => {
        init();
    }, [])

    return (
        <Stack alignItems={"center"}>
            {
                settings.map((option: any) => (
                        <Box>
                            <SettingRow
                                configKey={option.configKey}
                                configValue={option.configValue}
                                description={option.description}
                                init={init}
                            />
                            <Divider/>
                        </Box>
                    )
                )
            }
        </Stack>
    );
}

export default Settings;