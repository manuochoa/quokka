import React from "react";
import ReactDOM from "react-dom";
import "./fonts/stylesheet.css";
import "./scss/style.scss";
import App from "./App";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      transition={Flip}
      theme="colored"
    />
  </React.StrictMode>,
  document.getElementById("root")
);
