import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  RequestStatus,
  Task,
  TasksState,
  TaskStatus,
} from "../../types/Task.types";
import {
  addTaskQuery,
  getTasksQuery,
  deleteTaskQuery,
  updateTaskQuery,
} from "../../utility/api";
import type { RootState } from "../store";

const initialState: TasksState = {
  tasksList: [] as Task[],
  status: RequestStatus.IDLE,
  error: null,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
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
      state.tasksList.unshift(action.payload);
    });
    builder.addCase(createTask.rejected, (state, action) => {
      state.status = RequestStatus.FAILED;
      state.error = action.error.message;
    });

    builder.addCase(completeTask.pending, (state) => {
      state.status = RequestStatus.LOADING;
    });
    builder.addCase(completeTask.fulfilled, (state, action) => {
      state.status = RequestStatus.SUCCEEDED;
      const index = state.tasksList.findIndex(
        (task) => task.id === action.payload.id
      );
      state.tasksList[index] = action.payload;
    });
    builder.addCase(completeTask.rejected, (state, action) => {
      state.status = RequestStatus.FAILED;
      state.error = action.error.message;
    });

    builder.addCase(deleteTask.pending, (state) => {
      state.status = RequestStatus.LOADING;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.status = RequestStatus.SUCCEEDED;
      state.tasksList = state.tasksList.filter(
        (task) => task.id !== action.meta.arg
      );
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.status = RequestStatus.FAILED;
      state.error = action.error.message;
    });
  },
});

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await getTasksQuery();
  return response;
});

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (title: string) => {
    const response = await addTaskQuery({ title, status: TaskStatus.OPEN });
    return response;
  }
);

export const completeTask = createAsyncThunk(
  "tasks/completeTask",
  async (task: Pick<Task, "id" | "status">) => {
    const response = await updateTaskQuery(task);
    return response;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: number) => {
    await deleteTaskQuery(taskId);
  }
);

export const selectTasks = (state: RootState): Task[] => state.tasks.tasksList;

export default tasksSlice.reducer;
