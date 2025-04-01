import ReactDOM from "react-dom/client";
import App from "./App";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QueryProvider from "./client/react-query/QueryProvider";
import AuthProvider from "./client/_auth/context/authcontext";
import { getCookie } from "./client/helper/getCookies";

const sessionId = getCookie("sessionId");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider sessionId={String(sessionId)}>
          <App />
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
