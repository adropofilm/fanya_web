import { ReactElement } from "react";
import { NewTaskInputForm } from "../newTaskInputForm/NewTaskInputForm";
import { TaskItem } from "../taskItem/TaskItem";
import styles from "./TaskListContainer.module.css";
import { useGetTasksQuery } from "../../store/features/apiSlice";
import { TaskStatus, Task } from "../../types/Task.types";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  openSnackbar,
  selectIsSnackbarOpen,
} from "../../store/features/snackbarSlice";

type TaskContentTypes = ReactElement | Task[];

export const TaskListContainer = (): ReactElement => {
  const { data: tasks, isLoading, isSuccess, isError } = useGetTasksQuery();
  const dispatch = useAppDispatch();
  const isSnackbarOpen = useAppSelector(selectIsSnackbarOpen);

  let taskContent: TaskContentTypes = [];

  if (isLoading) {
    taskContent = <div>Loading...</div>;
  } else if (isSuccess) {
    taskContent = (
      <div id={styles["task-list"]} className="flex-column-center">
        {tasks.map(
          (task) =>
            task.status === TaskStatus.OPEN && (
              <TaskItem {...task} key={task.id} />
            )
        )}
      </div>
    );
  } else if (isError && !isSnackbarOpen) {
    dispatch(openSnackbar("An error occurred while fetching tasks."));
  }

  return (
    <div id={styles["task-list-container"]} className="flex-column-center">
      <h1 id={styles["task-list-header"]}>Keep It Moving 💪🏽</h1>
      <NewTaskInputForm />
      <>{taskContent}</>
    </div>
  );
};
