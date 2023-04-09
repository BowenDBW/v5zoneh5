import React from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import {useSearchParams} from "react-router-dom";
import {useNavigate} from "react-router-dom/";
import {postWithoutToken} from "./Request";

const OauthCallback = () => {

    const navigate = useNavigate();
    const [search, setSearch] = useSearchParams();

    React.useEffect(()=>{
        if(search.get("code") === null){
            navigate(-1);
        }else {
            postWithoutToken("/auth/oauth-authenticate",{token:search.get("code")}).then((res:any)=>{
                if(res.data.type === "GITLAB_NOT_FOUND"){
                    alert("未查询到绑定账号，请确认您是否之前手动绑定过");
                    navigate(-1);
                }else {
                    localStorage.setItem('v5_token', res.data.token);
                    localStorage.setItem('v5_id', res.data.id);
                    localStorage.setItem('v5_contact_tech', "全部");
                    localStorage.setItem('v5_contact_college', "全部");
                    localStorage.setItem('v5_contact_session', "现役");
                    navigate("/homepage/check-board");
                }
            }).catch(()=>{
                alert("登陆过程中出现错误");
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

export default OauthCallback;