import { useState } from "react";
import axios from "axios";
import styles from "./NewTaskInputForm.module.css";
import { tryApiRequestCatchError } from "../../utility/api";

type NewTaskInputFormProps = {
  getAllTasks: () => Promise<void>;
};

export const NewTaskInputForm = ({ getAllTasks }: NewTaskInputFormProps) => {
  const [taskString, setTask] = useState("");

  const body = {
    title: taskString,
    status: "open",
  };

  const onFormSubmit = async (event: { preventDefault: () => void }) => {
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
        onChange={(text) => {
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
