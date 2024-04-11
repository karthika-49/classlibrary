import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from "react-router-dom";


ReactDOM.render(
  <ChakraProvider>
     <Router>
      <App/>
     </Router>
  </ChakraProvider>
  , document.getElementById('root')
);
