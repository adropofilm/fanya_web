import axios from "axios";
import { useState, useEffect } from "react";
import { sendRequestToApi } from "../../utility/api";
import { NewTaskInputForm } from "../newTaskInputForm/NewTaskInputForm";
import { TaskItem } from "../taskItem/TaskItem";
import styles from "./TaskListContainer.module.css";

type Task = {
  status: string;
  title: string;
  id: number;
};

export const TaskListContainer = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const taskItems = Array.from(tasks);

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
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