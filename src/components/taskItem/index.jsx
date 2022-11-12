import React from "react";
import axios from 'axios';
import styles from './styles.module.css';
//{id, status, title}
const TaskItem = ({id, status, title, getAllTasks}) => {
    let taskBody = {
        status: "closed",
        id: id
    };
            
    const markTaskCompleted = () => {
        console.log("New task created!")

        const updateTask = async () => {
            await axios.put(`http://localhost:4000/tasks/${id}`, {task: taskBody})
            getAllTasks();
        };
        updateTask();
    }

    return (
        <label className={styles["container"]}>
            <input type="checkbox" onClick={markTaskCompleted} />
            <span className={styles["checkmark"]}></span>
            <span>{title}</span>
        </label>
    )
}

export default TaskItem;