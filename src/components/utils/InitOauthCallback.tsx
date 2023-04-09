import React from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import {useSearchParams} from "react-router-dom";
import {useNavigate} from "react-router-dom/";
import {post} from "./Request";

const InitOauthCallback = () => {

    const navigate = useNavigate();
    const [search, setSearch] = useSearchParams();

    React.useEffect(()=>{
        if(search.get("code") === null){
            navigate(-1);
        }else {
            post("/auth/init-access-token", {
                token:localStorage.getItem("v5_token"),
                message:search.get("code")
            }).then((res:any)=>{
                if(res.data.msg === "true"){
                    alert("绑定成功");
                }else if(res.data.msg === "duplicate"){
                    alert("该gitlab账号已绑定某个帐户，操作失败");
                }else {
                    alert("绑定失败");
                }
                navigate(-1);
            }).catch(()=>{
                alert("绑定失败");
                navigate(-1);
            })
        }
    },[])

    return (
        <Backdrop
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
    );
};

export default InitOauthCallback;