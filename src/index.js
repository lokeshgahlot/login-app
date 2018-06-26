import React from "react";
import {render} from "react-dom";
import { store } from "./store";
import Root from "./components/Root";

/* eslint-disable */
// This configures fake fetch
import FakeFetch from "./utils/fakeFetch";
/* eslint-enable */

render(<Root store={store}/>, document.getElementById("root"));
