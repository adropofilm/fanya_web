import axios from "axios";
import { useState, useEffect } from "react";
import { TaskBody } from "../../types/Task.types";
import { sendRequestToApi } from "../../utility/api";
import { NewTaskInputForm } from "../newTaskInputForm/NewTaskInputForm";
import { TaskItem } from "../taskItem/TaskItem";
import styles from "./TaskListContainer.module.css";

export const TaskListContainer = (): JSX.Element => {
  const [tasks, setTasks] = useState<TaskBody[]>([]);
  const taskItems = Array.from(tasks);

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async (): Promise<void | never> => {
    try {
      const { data } = await sendRequestToApi(axios.get, 200);
      setTasks(data);
    } catch (error) {
      console.log(`Error occured ${error}`);
    }
  };

  const taskList = taskItems?.map((task) => {
    if (task.status === "open") {
      return <TaskItem {...task} key={task.id} getAllTasks={getAllTasks} />;
    } else {
      return null;
    }
  });

  return (
    <div id={styles["task-list-container"]} className="flex-column-center">
      <h1 id={styles["task-list-header"]}>Keep It Moving 💪🏽</h1>
      <NewTaskInputForm getAllTasks={getAllTasks} />
      <div id={styles["task-list"]} className="flex-column-center">
        {taskList}
      </div>
    </div>
  );
};
