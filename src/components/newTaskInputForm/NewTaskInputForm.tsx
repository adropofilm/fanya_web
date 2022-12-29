import { ReactElement, useState } from "react";
import { useCreateTaskMutation } from "../../store/features/apiSlice";
import styles from "./NewTaskInputForm.module.css";

export const NewTaskInputForm = (): ReactElement => {
  const [title, setTitle] = useState("");
  const [addNewTask, { isLoading }] = useCreateTaskMutation();

  const canSave = [title].every(Boolean) && !isLoading;

  const onFormSubmit = async (event: {
    preventDefault: () => void;
  }): Promise<void> => {
    event.preventDefault();
    try {
      if (canSave) {
        await addNewTask(title);
        setTitle("");
      }
    } catch (error) {
      console.error(`Failed to save task: ${error}`);
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
