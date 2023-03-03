import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import {useRoutes} from "react-router-dom";
import routes from "./routes"


function App() {

  const element = useRoutes(routes)

  return (
      <React.StrictMode>
        <HashRouter>
          {element}
        </HashRouter>
      </React.StrictMode>
  );
}

export default App;
