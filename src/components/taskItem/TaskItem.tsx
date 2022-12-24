import styles from "./TaskItem.module.css";
import { Dispatch, ReactElement, SetStateAction } from "react";
import { Task, Status } from "../../types/Task.types";
import { deleteTask, updateTask } from "../../utility/api";

export type Props = Task & {
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

export const TaskItem = ({ id, title, setTasks }: Props): ReactElement => {
  const markTaskCompleted = async (): Promise<void> => {
    const taskBody = {
      status: Status.CLOSED,
      id,
    };

    try {
      await updateTask(taskBody);
      setTasks((prevState) => prevState.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const markTaskDeleted = async (): Promise<void> => {
    try {
      await deleteTask(id as number);
      setTasks((prevState) => prevState.filter((task) => task.id !== id));
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
