import React, { useState, useEffect } from 'react';
import axios from "axios";
import NewTaskInputForm from '../newTaskInputForm/NewTaskInputForm';
import './styles.css'

const TaskListContainer = () => {
    const [tasks, setTasks] = useState([]);
    const taskItems = Array.from(tasks);

    useEffect(() => {
        getAllTasks();
      }, [])

    const getAllTasks = async () => {
      const { data } = await axios.get("http://localhost:4000/tasks")
      setTasks(data.data);
    };

    const taskList = taskItems?.map((task) => {
        return (
            <div key={task.id} className="task-item">
                <div>{task.title}</div>
            </div>
        );
    }, []);

    return (
        <div id="task-list-container">
            <h1>Keep It Moving 💪🏽</h1>
            <NewTaskInputForm getAllTasks={getAllTasks}/>
            <div id="task-list">
                {taskList}
            </div>
        </div>
    )
}

export default TaskListContainer;