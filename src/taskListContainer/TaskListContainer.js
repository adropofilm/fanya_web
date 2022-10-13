import React from 'react';
import NewTaskInputForm from '../newTaskInputForm/NewTaskInputForm';
import './styles.css'

const TaskListContainer = () => {
    return (
        <div id="task-list-container">
            <h1>Keep It Moving 💪🏽</h1>
            <NewTaskInputForm />
        </div>
    )
}

export default TaskListContainer;