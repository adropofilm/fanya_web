export type Task = {
  id: number;
  title: string;
  status: Status;
};

export enum Status {
  OPEN = "open",
  CLOSED = "closed",
}
