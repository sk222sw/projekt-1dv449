import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Layout from "./pages/Layout";
import Playlist from "./pages/Playlist";

import "./stylesheets/style.css";

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={App}></IndexRoute>
      <Route path="playlist" component={Playlist}></Route>
    </Route>
  </Router>,
app);
