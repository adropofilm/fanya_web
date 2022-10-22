import React from 'react';
import NewTaskInputForm from '../newTaskInputForm/NewTaskInputForm';
import './styles.css'

const TaskListContainer = (props) => {
    const taskItems = Array.from(props.tasks);

    const taskList = taskItems?.map((task) => {
        return (
            <div key={task.id} className="task-item">
                <div>{task.title}</div>
            </div>
        );
    });

    return (
        <div id="task-list-container">
            <h1>Keep It Moving 💪🏽</h1>
            <NewTaskInputForm />
            <div id="task-list">
                {taskList}
            </div>
        </div>
    )
}

export default TaskListContainer;