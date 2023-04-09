import React from 'react';
import {useSearchParams} from "react-router-dom";
import Global from "../../GlobalParams";
import {Document, Page, pdfjs} from "react-pdf";
import Grid from "@mui/material/Grid";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfReader = () => {
    const [search, setSearch] = useSearchParams();
    const [numPages, setNumPages] = React.useState<any>(null);

    return (
        <Grid container sx={{justifyContent: "center", alignItems: "center"}}>
            <Grid xs={2}/>
            <Grid xs={8}>
                <Document
                    file={Global.backendUrl + "/public-article/download/" + search.get("fileLink")}
                    onLoadSuccess={({numPages}) => setNumPages(numPages)}
                >
                    {Array.apply(null, Array(numPages))
                        .map((x, i) => i + 1)
                        .map(page => <Page pageNumber={page} width={window.innerWidth * 0.6}/>)}
                </Document>
            </Grid>
            <Grid xs={2}/>
        </Grid>
    );
}

export default PdfReader;