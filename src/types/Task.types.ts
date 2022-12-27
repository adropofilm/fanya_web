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
  tasks: {
    tasks: Task[];
    status: RequestStatus;
    error: string | null;
  };
};

export enum RequestStatus {
  IDLE = "idle",
  LOADING = "loading",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}
