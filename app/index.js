import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import Welcome from "./pages/Welcome";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Layout from "./pages/Layout";

import "./stylesheets/style.css";

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Welcome} />
      <Route path="playlist(/:playlist)" component={App} />
    </Route>
  </Router>,
app);
