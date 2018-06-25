import React from "react";
import {Provider} from "react-redux";
import {render} from "react-dom";
import { store } from "./store";
import Root from "./components/Root";
import FakeFetch from "./utils/fakeFetch";

render(<Root store={store}/>, document.getElementById("root"));
