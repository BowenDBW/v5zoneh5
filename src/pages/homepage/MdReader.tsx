import React, {useEffect, useState} from 'react';
import ReactMarkdown from "react-markdown";
import {darcula, vscDarkPlus} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {Box, Button, Grid, Stack} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";
import gfm from "remark-gfm";
import Global from "../../GlobalParams";


const them = {
    dark: vscDarkPlus,
    light: darcula
}

const MdReader = () => {

    const [search, setSearch] = useSearchParams();

    const [textContent, setContent] = useState("");

    const [isOutside, setIsOutside] = useState(search.get("isOutside") === "true");

    async function init() {
        const temp = isOutside ? "public-article" : "article";
        const url = Global.backendUrl
            + "/"
            + temp
            + "/download/"
            + search.get("fileLink");
        fetch(url)
            .then(res => res.text())
            .then(text => setContent(text));

    }

    useEffect(() => {
        init();
    }, [])

    // String文本 boolean
    them.light = darcula;

    const navigate = useNavigate();

    return (
        <Stack sx={{margin: 2}}>
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
                            marginX: 2,
                            fontWeight: "bold",
                            fontSize: 16,
                        }}
                    >返回上一级</Button>
                }
            </Box>
            {Global.isDesktop ?
                <Grid container>
                    <Grid xs={2}>
                    </Grid>
                    <Grid xs={8}>
                        <ReactMarkdown
                            remarkPlugins={[gfm]}
                        >
                            {textContent}
                        </ReactMarkdown>
                    </Grid>
                    <Grid xs={2}>

                    </Grid>
                </Grid>
                :
                <ReactMarkdown>
                    {textContent}
                </ReactMarkdown>
            }

        </Stack>

    );
}

export default MdReader;