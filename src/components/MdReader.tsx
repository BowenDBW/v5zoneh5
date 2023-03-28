import React, {useEffect, useState} from 'react';
import ReactMarkdown from "react-markdown";
import {darcula, vscDarkPlus} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {Box, Button, Grid, Stack} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import gfm from "remark-gfm";
import {IsDesktop} from "./utils/IsDesktop";


const them = {
    dark: vscDarkPlus,
    light: darcula
}

function MdReader() {

    const isDesktop = IsDesktop();

    const [search, setSearch] = useSearchParams()

    const [textContent, setContent] = useState("")

    const [darkMode, setDarkMode] = useState(false)

    async function init() {
        const url = axios.defaults.baseURL
            + "/markdown/download/"
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
                <Button
                    variant={"outlined"}
                    onClick={() => {
                        navigate(-1);
                    }}
                    sx={{
                        width: 140,
                        margin: 2,
                        fontWeight: "bold",
                    }}
                >返回上一级</Button>
            </Box>
            {isDesktop ?
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