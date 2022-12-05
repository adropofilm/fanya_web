import React, { useState, useEffect } from 'react';
import NewTaskInputForm from '../newTaskInputForm';
import TaskItem from '../taskItem';
import styles from './styles.module.css';
import { getAllTasksFromApi } from "./api";

type Task = {
    status: string,
    title: string,
    id: number
}

const TaskListContainer = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const taskItems = Array.from(tasks);

    useEffect(() => {
        getAllTasks();
      }, [])

    const getAllTasks = async () => {
        try {
            getAllTasksFromApi()
        } catch (error) {
            
        }
      getAllTasksFromApi()
        .then(response => {
            setTasks(response.data)
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