import renderer from "react-test-renderer";
import { TaskItem } from "./TaskItem";

const getAllTasks = jest.fn();

it("renders correctly", () => {
  const tree = renderer
    .create(
      <TaskItem
        id={1}
        status="open"
        title="clean the garage"
        getAllTasks={getAllTasks}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
