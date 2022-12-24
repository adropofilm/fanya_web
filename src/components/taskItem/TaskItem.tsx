import styles from "./TaskItem.module.css";
import { ReactElement } from "react";
import { Task, Status } from "../../types/Task.types";
import { deleteTask, getTasks, updateTask } from "../../utility/api";

export type Props = Task & {
  setTasks: (tasks: ReadonlyArray<Task>) => void;
};

export const TaskItem = ({ id, title, setTasks }: Props): ReactElement => {
  const markTaskCompleted = async (): Promise<void> => {
    const taskBody = {
      status: Status.CLOSED,
      id,
    };

    try {
      const response = await updateTask(taskBody);

      if (response) {
        const tasks = await getTasks();
        setTasks(tasks);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const markTaskDeleted = async (): Promise<void> => {
    try {
      await deleteTask(id);
      const tasks = await getTasks();
      setTasks(tasks);
    } catch (error) {
      console.error(error);
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
