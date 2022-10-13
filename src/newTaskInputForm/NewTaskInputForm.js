import React, { useState } from "react";
import './styles.css';
import { TextField } from "@mui/material";

const NewTaskInputForm = () => {
    const [taskString, setTask] = useState(null)

    const onFormSubmit = (task) => {
        task.preventDefault();
        setTask(task);
    }

    return (
        <form onSubmit={() => onFormSubmit}>
            <TextField 
                onChange={(text) => {
                    setTask(text.target.value);
                    console.log(text.target.value)
                }}
                id="filled-basic" 
                label="Filled" 
                variant="filled" 
                required/>
        </form>
    )
}

export default NewTaskInputForm;