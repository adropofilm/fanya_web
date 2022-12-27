import styles from "./TaskItem.module.css";
import { ReactElement } from "react";
import { Task, TaskStatus } from "../../types/Task.types";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { completeTask, deleteTask } from "../../store/features/tasksSlice";

type Props = Task;

export const TaskItem = ({ id, title }: Props): ReactElement => {
  const dispatch = useAppDispatch();

  const markTaskCompleted = async (): Promise<void> => {
    const task = {
      status: TaskStatus.CLOSED,
      id,
    };

    try {
      dispatch(completeTask(task));
    } catch (error) {
      console.error(error);
    }
  };

  const markTaskDeleted = async (): Promise<void> => {
    try {
      dispatch(deleteTask(id));
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
