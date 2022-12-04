import React, { useState } from "react";
import axios from 'axios';
import styles from './styles.module.css';

interface Props {
    getAllTasks: () => Promise<void>;
}

const NewTaskInputForm = ({getAllTasks}:Props) => {
    const [taskString, setTask] = useState("")

    const body = {
        title: taskString,
        status: "open"
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const createNewTask = async () => {
            await axios.post(`${process.env.REACT_APP_API_HOST}/tasks`, body)
            getAllTasks();
        };
        createNewTask();
        setTask("");
    }

    return (

        <form id={styles["new-task-input-form"]} className="flex-column-center" onSubmit={onFormSubmit}>
            <input 
                id={styles["new-task-input"]}
                placeholder="Type the name of your task..."
                onChange={(text) => {
                    setTask(text.target.value);
                }}
                type="text"
                value={taskString}
                required />

            <button id={styles["new-task-btn"]} type="submit">create task</button>
        </form>
    )
}

export default NewTaskInputForm;