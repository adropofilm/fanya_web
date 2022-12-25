import renderer from "react-test-renderer";
import { Status } from "../../types/Task.types";
import { TaskItem } from "./TaskItem";

const setTasks = jest.fn();

it("renders correctly", () => {
  const tree = renderer
    .create(
      <TaskItem
        id={1}
        status={Status.OPEN}
        title="clean the garage"
        setTasks={setTasks}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
