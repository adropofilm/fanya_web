import React, { useState, useEffect } from 'react';
import axios from "axios";
import NewTaskInputForm from '../newTaskInputForm/NewTaskInputForm';
import TaskItem from '../taskItem/TaskItem';
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
        if(task.status === "open") {
            return (
                <TaskItem {...task} />
            );
        } else { 
            return null; 
        }
    });

    return (
        <div id="task-list-container" className="flex-column-center">
            <h1>Keep It Moving 💪🏽</h1>
            <NewTaskInputForm getAllTasks={getAllTasks}/>
            <div id="task-list" className="flex-column-center">
                {taskList}
            </div>
        </div>
    )
}

export default TaskListContainer;