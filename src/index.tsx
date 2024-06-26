import 'react-app-polyfill/ie11';
import React from 'react';
//import ReactDOM from 'react-dom';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './shared/styles/index.css';
import App from './App';
import 'app/services';
import reportWebVitals from './reportWebVitals';

import {createRoot} from "react-dom/client";


const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App  />);

//ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();