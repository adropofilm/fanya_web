import React from "react";
import axios from 'axios';
import styles from './styles.module.css';

const TaskItem = ({id, status, title, getAllTasks}) => {
    let taskBody = {
        status: "closed",
        id: id
    };
            
    const markTaskCompleted = event => {
        //event.stopPropagation()

        console.log("here")

        const updateTask = async () => {
            await axios.put(`http://localhost:4000/tasks/${id}`, {task: taskBody})
            getAllTasks();
        };
        updateTask();
    }

    return (
        <div className={styles["container"]}>
            <input className="checkbox-input" role="checkbox" aria-checked="false" />
            <span className={styles["checkmark"]} onClick={markTaskCompleted}></span>
            <label>{title}</label>
            <span className={`material-symbols-outlined ${styles["delete-icon"]}`}>delete</span>
        </div>
    )
}

export default TaskItem;