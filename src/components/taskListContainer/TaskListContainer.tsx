import { useEffect, ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { selectTasks, fetchTasks } from "../../store/features/tasksSlice";
import { TaskStatus, RequestStatus } from "../../types/Task.types";
import { NewTaskInputForm } from "../newTaskInputForm/NewTaskInputForm";
import { TaskItem } from "../taskItem/TaskItem";
import styles from "./TaskListContainer.module.css";

export const TaskListContainer = (): ReactElement => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  const getTasksRequestStatus = useAppSelector((state) => state.tasks.status);

  useEffect(() => {
    try {
      if (getTasksRequestStatus === RequestStatus.IDLE) {
        dispatch(fetchTasks());
      }
    } catch (error) {
      console.error(error);
    }
  }, [getTasksRequestStatus, dispatch]);

  return (
    <div id={styles["task-list-container"]} className="flex-column-center">
      <h1 id={styles["task-list-header"]}>Keep It Moving 💪🏽</h1>
      <NewTaskInputForm />
      <div id={styles["task-list"]} className="flex-column-center">
        {tasks.map(
          (task) =>
            task.status === TaskStatus.OPEN && (
              <TaskItem {...task} key={task.id} />
            )
        )}
      </div>
    </div>
  );
};
