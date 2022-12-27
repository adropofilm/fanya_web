import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  RequestStatus,
  Task,
  TasksState,
  TaskStatus,
} from "../../types/Task.types";
import { addTask, getTasks } from "../../utility/api";
import type { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: TasksState = {
  tasksList: [] as Task[],
  status: RequestStatus.IDLE,
  error: null,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    tasksGot: (state, action: PayloadAction<Task[]>) => {
      state.tasksList = action.payload;
    },
    taskAdded: (state, action: PayloadAction<Task>) => {
      state.tasksList.push(action.payload);
    },
    taskRemoved: (state, action: PayloadAction<number>) => {
      state.tasksList = state.tasksList.filter(
        (task) => task.id !== action.payload
      );
    },
    taskCompleted: (state, action: PayloadAction<number>) => {
      state.tasksList = state.tasksList.map((task) => {
        if (task.id === action.payload) {
          return { ...task, status: TaskStatus.CLOSED };
        }
        return task;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.status = RequestStatus.LOADING;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.status = RequestStatus.SUCCEEDED;
      state.tasksList = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.status = RequestStatus.FAILED;
      state.error = action.error.message;
    });

    builder.addCase(createTask.pending, (state) => {
      state.status = RequestStatus.LOADING;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.status = RequestStatus.SUCCEEDED;
      state.tasksList.push(action.payload);
    });
    builder.addCase(createTask.rejected, (state, action) => {
      state.status = RequestStatus.FAILED;
      state.error = action.error.message;
    });
  },
});

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await getTasks();
  return response;
});

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (title: string) => {
    const response = await addTask({ title, status: TaskStatus.OPEN });
    return response;
  }
);

export const { tasksGot, taskAdded, taskRemoved, taskCompleted } =
  tasksSlice.actions;

export const selectTasks = (state: RootState): Task[] => state.tasks.tasksList;

export default tasksSlice.reducer;
