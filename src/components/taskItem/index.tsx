import React from "react";
import axios from 'axios';
import styles from './styles.module.css';

type TaskItemProps = {
    id: number;
    title: string;
    status: string;
    getAllTasks: () => Promise<void>;
}

const TaskItem = ({id, status, title, getAllTasks}: TaskItemProps) => {
    let taskBody = {
        status: "closed",
        id: id
    };
            
    const markTaskCompleted = () => {
        const updateTask = async () => {
            await axios.put(`${process.env.REACT_APP_API_HOST}/tasks/${id}`, {task: taskBody})
            getAllTasks();
        };
        updateTask();
    }

    const markTaskDeleted = () => {
        const deleteTask = async () => {
            await axios.delete(`${process.env.REACT_APP_API_HOST}/tasks/${id}`)
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