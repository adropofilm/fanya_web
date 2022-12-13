import { useState } from "react";
import axios from "axios";
import styles from "./NewTaskInputForm.module.css";
import { tryApiRequestCatchError } from "../../utility/api";
import { NewTaskInputFormProps } from "../../types/Task.types";

export const NewTaskInputForm = ({
  getAllTasks,
}: NewTaskInputFormProps): JSX.Element => {
  const [taskString, setTask] = useState("");

  const body = {
    title: taskString,
    status: "open",
  };

  const onFormSubmit = async (event: {
    preventDefault: () => void;
  }): Promise<void | never> => {
    event.preventDefault();
    await tryApiRequestCatchError(getAllTasks, axios.post, 201, `/`, body);
    setTask("");
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
