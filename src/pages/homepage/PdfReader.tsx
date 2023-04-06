import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

function PdfReader() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess() {
    }

    return (
        <div>
            <Page/>
            <Document file="somefile.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
            </Document>
        </div>
    );
}