import React from "react";
import styles from './styles.module.css';

const TaskItem = ({id, status, title}) => {

    return (
        <label className={styles["container"]} key={id}>
            <input type="checkbox" />
            <span className={styles["checkmark"]}></span>
            <span>{title}</span>
        </label>
    )
}

export default TaskItem;