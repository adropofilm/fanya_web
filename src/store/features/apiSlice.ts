import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task, TaskStatus } from "../../types/Task.types";

const baseURL: string = process.env.REACT_APP_API_HOST as string;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => "/tasks",
      providesTags: ["Task"],
    }),
    createTask: builder.mutation<Task, string>({
      query: (title) => ({
        url: "/tasks",
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["Task"],
    }),
    completeTask: builder.mutation<Task, number>({
      query: (id) => ({
        url: `/tasks`,
        method: "PUT",
        body: { id, status: TaskStatus.CLOSED },
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation<Task, number>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useCompleteTaskMutation,
  useDeleteTaskMutation,
} = apiSlice;
