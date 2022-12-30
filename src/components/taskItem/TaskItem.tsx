import styles from "./TaskItem.module.css";
import { ReactElement } from "react";
import { Task } from "../../types/Task.types";
import {
  useCompleteTaskMutation,
  useDeleteTaskMutation,
} from "../../store/features/apiSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  openSnackbar,
  selectIsSnackbarOpen,
} from "../../store/features/snackbarSlice";

export const TaskItem = ({ id, title }: Task): ReactElement => {
  const dispatch = useAppDispatch();
  const isSnackbarOpen = useAppSelector(selectIsSnackbarOpen);

  const [completeTask, { isLoading: isLoadingTaskCompletion }] =
    useCompleteTaskMutation();
  const [deleteTask, { isLoading: isLoadingTaskDeletion }] =
    useDeleteTaskMutation();

  const canDelete = [title].every(Boolean) && !isLoadingTaskDeletion;
  const canComplete = [title].every(Boolean) && !isLoadingTaskCompletion;

  const markTaskCompleted = async (): Promise<void> => {
    try {
      if (canComplete) {
        await completeTask(id);
      }
    } catch (error) {
      !isSnackbarOpen &&
        dispatch(openSnackbar("An error occurred while completing task."));
    }
  };

  const markTaskDeleted = async (): Promise<void> => {
    try {
      if (canDelete) {
        await deleteTask(id);
      }
    } catch (error) {
      !isSnackbarOpen &&
        dispatch(openSnackbar("An error occurred while deleting task."));
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
