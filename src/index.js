import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Switch} from "react-router-dom"

import MakeForm from "./components/make_form.jsx";
import ResultView from "./components/result_view.jsx";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path={'/'} component={MakeForm}/>
      <Route exact path={'/result'} component={ResultView}/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
