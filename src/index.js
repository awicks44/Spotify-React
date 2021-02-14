import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import ViewportProvider from './viewport/Viewport';
import Home from './onepirate/Home';


ReactDOM.render(
  <React.StrictMode>
    {/* <ViewportProvider> */}
    <App />
    {/* <Home /> */}
    {/* </ViewportProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

