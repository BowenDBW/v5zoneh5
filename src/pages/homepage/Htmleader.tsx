import React from 'react';
import {useSearchParams} from "react-router-dom";
import Global from "../../GlobalParams";
import Box from "@mui/material/Box";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom/";

const Htmleader = () => {

    const navigate = useNavigate();
    const [search, setSearch] = useSearchParams();
    const [html, setHtml] = React.useState('');
    const [isOutside, setIsOutside] = React.useState(search.get("isOutside") === "true");

    const init = () => {
        const temp = isOutside ? "public-article" : "article";
        const url = Global.baseUrl
            + "/"
            + temp
            + "/download/"
            + search.get("fileLink");
        fetch(url)
            .then(res => res.text())
            .then(text => setHtml(text));
    }

    React.useEffect(() => {
        init();
    }, []);

    return (
        <Box>
            <Box>
                {isOutside ?
                    <div/>
                    :
                    <Button
                        variant={"outlined"}
                        onClick={() => {
                            navigate(-1);
                        }}
                        sx={{
                            position: "fixed",
                            width: 140,
                            marginX: 2,
                            fontWeight: "bold",
                            fontSize: 20,
                        }}
                    >返回上一级</Button>
                }
            </Box>
            <div dangerouslySetInnerHTML={{__html: html}}/>
        </Box>
    );
};

export default Htmleader;