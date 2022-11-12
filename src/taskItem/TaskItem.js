import React from "react";
import styles from './styles.module.css';

const TaskItem = ({id, status, title}) => {

    return (
        <div key={id} className={styles["task-item"]}>
            <p>{title}</p>
        </div>
    )
}

export default TaskItem;