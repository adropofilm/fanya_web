import React, { useState, useEffect } from "react";
import axios from 'axios';
import './styles.css';
import { TextField } from "@mui/material";

const NewTaskInputForm = () => {
    const [taskString, setTask] = useState("")

    let body = {
        title: taskString
    };

    const onFormSubmit = (taskString) => {
        console.log(`TASK IS ${taskString}`)
        const search = async () => {
            const { data } = await axios.post("http://localhost:4000/tasks", {
                body
            })
        };
        search();
    }

    return (
        <form onSubmit={(onFormSubmit}>
            <input 
                onChange={(text) => {
                    setTask(text.target.value);
                }}
                type="text"
                value={taskString}
                required/>
        </form>
    )
}

export default NewTaskInputForm;