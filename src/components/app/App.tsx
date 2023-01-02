import { ReactElement } from "react";
import { TaskListContainer } from "../taskListContainer/TaskListContainer";
import "./App.css";
import { CustomSnackbar } from "../common/CustomSnackbar";

export const App = (): ReactElement => (
  <div className="page-container">
    <CustomSnackbar />
    <TaskListContainer />
  </div>
);
