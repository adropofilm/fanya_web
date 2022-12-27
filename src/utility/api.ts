import axios from "axios";
import { Task } from "../types/Task.types";

const baseURL: string = process.env.REACT_APP_API_HOST as string;

const assertStatusCode = (
  expectedStatus: number,
  actualStatus: number,
  message: string
): void => {
  if (expectedStatus !== actualStatus) {
    throw new Error(`Error: ${message}`);
  }
};

export const getTasksQuery = async (): Promise<Task[]> => {
  const response = await axios.get(baseURL);
  assertStatusCode(200, response.status, "Could not get tasks");
  return response.data;
};

export const addTaskQuery = async (
  task: Pick<Task, "title" | "status">
): Promise<Task> => {
  const response = await axios.post(baseURL, task);
  assertStatusCode(201, response.status, "Could not add task");
  return response.data;
};

export const deleteTaskQuery = async (taskId: number): Promise<void> => {
  const response = await axios.delete(`${baseURL}/${taskId}`);
  assertStatusCode(204, response.status, "Could not delete task");
};

export const updateTaskQuery = async (
  task: Pick<Task, "id" | "status">
): Promise<Task> => {
  const response = await axios.put(baseURL, task);
  assertStatusCode(200, response.status, "Could not update task");
  return response.data;
};
