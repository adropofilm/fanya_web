import { FormEvent, ReactElement, useState } from "react";
import styles from "./NewTaskInputForm.module.css";
import { addTask, getTasks } from "../../utility/api";
import { Status, Task } from "../../types/Task.types";

type Props = {
  setTasks: (tasks: ReadonlyArray<Task>) => void;
};

export const NewTaskInputForm = ({ setTasks }: Props): ReactElement => {
  const [title, setTitle] = useState("");

  const onFormSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const task = {
      title,
      status: Status.OPEN,
    };

    console.log(task, event);

    const response = await addTask(task);

    if (response) {
      const tasks = await getTasks();
      setTasks(tasks);
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
