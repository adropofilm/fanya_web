import axios from "axios";
import { Task } from "../types/Task.types";

const baseURL: string = process.env.REACT_APP_API_HOST as string;

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get(baseURL);
  return response.data;
};

export const addTask = async (
  task: Pick<Task, "title" | "status">
): Promise<Task> => {
  const response = await axios.post(baseURL, task);
  return response.data;
};

export const deleteTask = async (id: number): Promise<Task> => {
  const response = await axios.delete(`${baseURL}/${id}`);
  return response.data;
};

export const updateTask = async (
  task: Pick<Task, "id" | "status">
): Promise<Task> => {
  const response = await axios.put(baseURL, task);
  return response.data;
};
