import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css"
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import Routes from "./routes/Routes.js";
import UploadingAnimation from "./POPUP/UploadingAnimation.js";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={Routes} />);
// root.render(<UploadingAnimation />);

reportWebVitals();
