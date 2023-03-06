import React from 'react';
import './App.css';
import {useRoutes} from "react-router-dom";
import routes from "./routes";
import {Box} from "@mui/material";


function App() {

    const element = useRoutes(routes)

    return (
        <Box>
            {element}
        </Box>
    );
}

export default App;
