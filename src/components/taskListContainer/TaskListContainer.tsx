import { useState, useEffect, ReactElement } from "react";
import { Status, Task } from "../../types/Task.types";
import { getTasks } from "../../utility/api";
import { NewTaskInputForm } from "../newTaskInputForm/NewTaskInputForm";
import { TaskItem } from "../taskItem/TaskItem";
import styles from "./TaskListContainer.module.css";

export const TaskListContainer = (): ReactElement => {
  const [tasks, setTasks] = useState<ReadonlyArray<Task>>([]);

  useEffect(() => {
    const fetchTasks = async (): Promise<void> => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div id={styles["task-list-container"]} className="flex-column-center">
      <h1 id={styles["task-list-header"]}>Keep It Moving 💪🏽</h1>
      <NewTaskInputForm setTasks={setTasks} />
      <div id={styles["task-list"]} className="flex-column-center">
        {tasks.map(
          (task) =>
            task.status === Status.OPEN && (
              <TaskItem {...task} key={task.id} setTasks={setTasks} />
            )
        )}
      </div>
    </div>
  );
};
