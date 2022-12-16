import { Dispatch, SetStateAction, useState } from "react";
import styles from "./NewTaskInputForm.module.css";
import { addTask } from "../../utility/api";
import { Task } from "../../types/Task.types";

export type Props = {
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

export const NewTaskInputForm = ({ setTasks }: Props): JSX.Element => {
  const [taskTitle, setTaskTitle] = useState("");

  const task = {
    title: taskTitle,
    status: "open",
  };

  const onFormSubmit = async (event: {
    preventDefault: () => void;
  }): Promise<void> => {
    event.preventDefault();
    const newTask = await addTask(task);
    setTaskTitle("");
    setTasks((prevTasks) => [...prevTasks, newTask]);
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
          setTaskTitle(text.target.value);
        }}
        type="text"
        value={taskTitle}
        required
      />

      <button id={styles["new-task-btn"]} type="submit">
        create task
      </button>
    </form>
  );
};
