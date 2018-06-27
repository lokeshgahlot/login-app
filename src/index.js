import React from "react";
import {render} from "react-dom";
import { store } from "./store";
import Root from "./components/Root";

/* eslint-disable */
// This configures fake fetch
// Once we have real back-end, It can be removed 
import FakeFetch from "./utils/fakeFetch";
/* eslint-enable */

render(<Root store={store}/>, document.getElementById("root"));
