import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { Newuser } from "./components/Newuser";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Cartpage from "./components/Cartpage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          {/* <Route index element={<App />} /> */}
          <Route index path="/" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="newUser" element={<Newuser />} />
          <Route path="cartpage" element={<Cartpage />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
