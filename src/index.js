import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainRoutes from './MainRoutes';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>,
  </React.StrictMode>,
  document.getElementById('root')
);

