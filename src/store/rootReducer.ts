import { combineReducers } from "redux";
import { apiSlice } from "./features/apiSlice";
import snackbarReducer from "./features/snackbarSlice";

const rootReducer = combineReducers({
  snackbar: snackbarReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;
