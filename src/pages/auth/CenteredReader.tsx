import React from 'react';
import {darcula, vscDarkPlus} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {Box} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";
import MdReader from "../homepage/MdReader";
import PdfReader from "../homepage/PdfReader";
import Htmleader from "../homepage/Htmleader";

const them = {
    dark: vscDarkPlus,
    light: darcula
}

function CenteredReader() {

    const [search, setSearch] = useSearchParams();

    const navigate = useNavigate();

    const getFileType = (fileName: string | null) => {
        // @ts-ignore
        const suffix = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
        if (suffix === "md") {
            return <MdReader/>;
        } else if (suffix === "pdf") {
            return <PdfReader/>;
        } else if (suffix === "html") {
            return <Htmleader/>;
        } else {
            return "";
        }
    }

    return (
        <Box
            sx={{
                width: window.innerWidth * 0.8,
                height: window.innerHeight,
                backgroundColor: '#ffffff',
                opacity: 0.85,
                borderRadius: 5,
            }}
        >
            {getFileType(search.get("fileLink"))}
        </Box>
    );
}

export default CenteredReader;
