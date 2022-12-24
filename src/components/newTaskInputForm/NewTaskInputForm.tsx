import { ReactElement, useState } from "react";
import styles from "./NewTaskInputForm.module.css";
import { addTask, getTasks } from "../../utility/api";
import { Status, Task } from "../../types/Task.types";

export type Props = {
  setTasks: (tasks: ReadonlyArray<Task>) => void;
};

export const NewTaskInputForm = ({ setTasks }: Props): ReactElement => {
  const [title, setTitle] = useState("");

  const task = {
    title: title,
    status: Status.OPEN,
  };

  const onFormSubmit = async (event: {
    preventDefault: () => void;
  }): Promise<void> => {
    event.preventDefault();
    try {
      const response = await addTask(task);
      setTitle("");

      if (response) {
        const tasks = await getTasks();
        setTasks(tasks);
      }
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
