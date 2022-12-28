import ReactDOM from "react-dom/client";
import { App } from "./components/app/App";
import React from "react";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { apiSlice } from "./store/features/apiSlice";
//import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApiProvider api={apiSlice}>
      <App />
    </ApiProvider>
  </React.StrictMode>
);
