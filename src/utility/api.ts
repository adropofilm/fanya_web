import axios from "axios";
import { Task } from "../types/Task.types";

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get(`${process.env.REACT_APP_API_HOST}/tasks`);
  return response.data.data;
};

export const addTask = async (task: Task): Promise<Task> => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_HOST}/tasks`,
    task
  );
  return response.data.data;
};

export const deleteTask = async (taskId: number): Promise<void> => {
  await axios.delete(`${process.env.REACT_APP_API_HOST}/tasks/${taskId}`);
};

export const updateTask = async (task: Task): Promise<void> => {
  const response = await axios.put(
    `${process.env.REACT_APP_API_HOST}/tasks/${task.id}`,
    { task: task }
  );
  return response.data.data;
};

/* eslint-disable */
