import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskListContainer from './taskListContainer/TaskListContainer';
import './App.css'

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
      const search = async () => {
          const { data } = await axios.get("http://localhost:4000/tasks")
          setTasks(data.data);
      };
      search();
  })

  return (
    <div className="page-container">
      <TaskListContainer tasks={tasks}/>
    </div>
  );
}

export default App;
