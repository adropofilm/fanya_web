import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../../types/Task.types";

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [] as Task[],
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    completeTask: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload) {
          return { ...task, completed: true };
        }
        return task;
      });
    },
  },
});

export const { addTask, removeTask, completeTask } = tasksSlice.actions;

export default tasksSlice.reducer;
