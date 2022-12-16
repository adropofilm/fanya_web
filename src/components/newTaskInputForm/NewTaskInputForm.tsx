import { Dispatch, SetStateAction, useState } from "react";
import styles from "./NewTaskInputForm.module.css";
import { addTask } from "../../utility/api";
import { Task } from "../../types/Task.types";

export type Props = {
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

export const NewTaskInputForm = ({ setTasks }: Props): JSX.Element => {
  const [taskString, setTask] = useState("");

  const task = {
    title: taskString,
    status: "open",
  };

  const onFormSubmit = async (event: {
    preventDefault: () => void;
  }): Promise<void> => {
    event.preventDefault();
    const newTask = await addTask(task);
    setTask("");
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
          setTask(text.target.value);
        }}
        type="text"
        value={taskString}
        required
      />

      <button id={styles["new-task-btn"]} type="submit">
        create task
      </button>
    </form>
  );
};
