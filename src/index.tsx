import ReactDOM from "react-dom/client";
import { App } from "./components/app/App";
import React from "react";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { apiSlice } from "./store/features/apiSlice";
import { Provider } from "react-redux";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApiProvider api={apiSlice}>
        <App />
      </ApiProvider>
    </Provider>
  </React.StrictMode>
);
