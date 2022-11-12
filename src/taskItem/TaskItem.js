import React from "react";
import './styles.css';

const TaskItem = ({id, status, title}) => {

    return (
        <div key={id} className="task-item">
            <p>{title}</p>
        </div>
    )
}

export default TaskItem;