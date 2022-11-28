import React, { useState, useEffect } from 'react';
import axios from "axios";
import NewTaskInputForm from '../newTaskInputForm';
import TaskItem from '../taskItem';
import styles from './styles.module.css'
import { getAllTasksFromApi } from "./api"

const TaskListContainer = () => {
    const [tasks, setTasks] = useState([]);
    const taskItems = Array.from(tasks);

    useEffect(() => {
        getAllTasks();
      }, [])

    const getAllTasks = async () => {
      getAllTasksFromApi()
        .then(data => {
            setTasks(data.data)
        })
        .catch(error => console.log(`Error occured ${error}`))
    };

    const taskList = taskItems?.map((task) => {
        if(task.status === "open") {
            return (
                <TaskItem {...task} key={task.id} getAllTasks={getAllTasks}/>
            );
        } else { 
            return null; 
        }
    });

    return (
        <div id={styles["task-list-container"]} className="flex-column-center">
            <h1 id={styles["task-list-header"]}>Keep It Moving 💪🏽</h1>
            <NewTaskInputForm getAllTasks={getAllTasks}/>
            <div id={styles["task-list"]} className="flex-column-center">
                {taskList}
            </div>
        </div>
    )
}

export default TaskListContainer;