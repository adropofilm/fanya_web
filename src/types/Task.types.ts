export type Task = {
  task: {
    status: string;
    id: number;
  };
};

export type NewTaskInputFormProps = {
  getAllTasks: () => Promise<void | never>;
};

export type TaskItemProps = {
  id: number;
  title: string;
  status: string;
  getAllTasks: () => Promise<void | never>;
};

export type TaskBody = {
  status: string;
  title: string;
  id: number;
};
