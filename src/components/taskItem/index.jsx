import React from "react";
import axios from 'axios';
import styles from './styles.module.css';

const TaskItem = ({id, status, title, getAllTasks}) => {
    let taskBody = {
        status: "closed",
        id: id
    };
            
    const markTaskCompleted = event => {
        const updateTask = async () => {
            await axios.put(`http://localhost:4000/tasks/${id}`, {task: taskBody})
            getAllTasks();
        };
        updateTask();
    }

    const markTaskDeleted = event => {
        const deleteTask = async () => {
            await axios.delete(`http://localhost:4000/tasks/${id}`)
            getAllTasks();
        };
        deleteTask();
    }

    return (
        <div className={styles["container"]}>
            <input className="checkbox-input" role="checkbox" aria-checked="false" />
            <span className={styles["checkmark"]} onClick={markTaskCompleted}></span>
            <label>{title}</label>
            <span className={`material-symbols-outlined ${styles["delete-icon"]}`} onClick={markTaskDeleted}>delete</span>
        </div>
    )
}

export default TaskItem;