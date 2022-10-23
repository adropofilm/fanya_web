import React, { useState } from "react";
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import './styles.css';

const NewTaskInputForm = ({getAllTasks}) => {
    const [taskString, setTask] = useState("")

    let body = {
        title: taskString,
        status: "open"
    };

    const onFormSubmit = () => {
        const createNewTask = async () => {
            await axios.post("http://localhost:4000/tasks", body)
            getAllTasks();
        };
        createNewTask();
        setTask("");
    }

    return (
        <>
            <TextField 
                id="standard-basic" 
                label="Standard" 
                variant="standard" 
                onChange={(text) => {
                    setTask(text.target.value);
                }}
                type="text"
                value={taskString}

                required />
            <Button onClick={onFormSubmit} variant="outlined">Outlined</Button>
        </>
    )
}

export default NewTaskInputForm;