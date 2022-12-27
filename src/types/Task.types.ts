export type Task = {
  id: number;
  title: string;
  status: TaskStatus;
};

export enum TaskStatus {
  OPEN = "open",
  CLOSED = "closed",
}

export type TasksState = {
  tasksList: Task[];
  status: RequestStatus;
  error: string | null | undefined;
};

export enum RequestStatus {
  IDLE = "idle",
  LOADING = "loading",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}
