import { ReactElement, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useCreateTaskMutation } from "../../store/features/apiSlice";
import {
  selectIsSnackbarOpen,
  openSnackbar,
} from "../../store/features/snackbarSlice";
import styles from "./NewTaskInputForm.module.css";

export const NewTaskInputForm = (): ReactElement => {
  const [title, setTitle] = useState("");
  const [addNewTask, { isLoading }] = useCreateTaskMutation();
  const dispatch = useAppDispatch();
  const isSnackbarOpen = useAppSelector(selectIsSnackbarOpen);

  const canSave = [title].every(Boolean) && !isLoading;

  const onFormSubmit = async (event: {
    preventDefault: () => void;
  }): Promise<void> => {
    event.preventDefault();
    try {
      if (canSave) {
        await addNewTask(title);
        setTitle("");
        dispatch(openSnackbar("Task created successfully."));
      }
    } catch (error) {
      !isSnackbarOpen &&
        dispatch(openSnackbar("An error occurred while deleting task."));
    }
  };

  return (
    <form
      id={styles["new-task-input-form"]}
      className="flex-column-center"
      onSubmit={onFormSubmit}>
      <input
        id={styles["new-task-input"]}
        placeholder="Type the name of your task..."
        onChange={(text): void => {
          setTitle(text.target.value);
        }}
        type="text"
        value={title}
        required
      />

      <button id={styles["new-task-btn"]} type="submit">
        create task
      </button>
    </form>
  );
};
