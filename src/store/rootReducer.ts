import { combineReducers } from "redux";
import tasksSlice from "./features/tasksSlice";

const rootReducer = combineReducers({
  tasks: tasksSlice,
});

export default rootReducer;
