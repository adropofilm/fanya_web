import { ReactElement } from "react";
import { TaskListContainer } from "../taskListContainer/TaskListContainer";
import "./App.css";

export const App = (): ReactElement => (
  <div className="page-container">
    <TaskListContainer />
  </div>
);
