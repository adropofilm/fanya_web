import styles from "./TaskItem.module.css";
import { ReactElement } from "react";
import { Status, Task } from "../../types/Task.types";
import { deleteTask, getTasks, updateTask } from "../../utility/api";

type Props = Task & {
  setTasks: (tasks: ReadonlyArray<Task>) => void;
};

export const TaskItem = ({ id, title, setTasks }: Props): ReactElement => {
  const markTaskCompleted = async (): Promise<void> => {
    const task = {
      status: Status.CLOSED,
      id,
    };

    const response = await updateTask(task);

    if (response) {
      const tasks = await getTasks();
      setTasks(tasks);
    }
  };

  const markTaskDeleted = async (): Promise<void> => {
    const response = await deleteTask(id);

    if (response) {
      const tasks = await getTasks();
      setTasks(tasks);
    }
  };

  return (
    <div className={styles["container"]}>
      <input className="checkbox-input" role="checkbox" aria-checked="false" />
      <span className={styles["checkmark"]} onClick={markTaskCompleted}></span>
      <label>{title}</label>
      <span
        className={`material-symbols-outlined ${styles["delete-icon"]}`}
        onClick={markTaskDeleted}>
        delete
      </span>
    </div>
  );
};
