import axios from "axios";
import { Task } from "../types/Task.types";

const baseURL: string = process.env.REACT_APP_API_HOST as string;

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get(baseURL);
  return response.data;
};

export const addTask = async (task: Task): Promise<Task> => {
  const response = await axios.post(baseURL, task);
  return response.data;
};

export const deleteTask = async (taskId: number): Promise<void> => {
  await axios.delete(`${baseURL}/${taskId}`);
};

export const updateTask = async (task: Task): Promise<void> => {
  const response = await axios.put(baseURL, task);
  return response.data;
};
