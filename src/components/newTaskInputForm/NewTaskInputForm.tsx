import { ReactElement, useState } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { createTask } from "../../store/features/tasksSlice";
import styles from "./NewTaskInputForm.module.css";

export const NewTaskInputForm = (): ReactElement => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");

  const onFormSubmit = async (event: {
    preventDefault: () => void;
  }): Promise<void> => {
    event.preventDefault();
    try {
      dispatch(createTask(title));
      setTitle("");
    } catch (error) {
      console.error(error);
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
