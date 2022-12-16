import renderer from "react-test-renderer";
import { TaskItem } from "./TaskItem";

const setTasks = jest.fn();

it("renders correctly", () => {
  const tree = renderer
    .create(
      <TaskItem
        id={1}
        status="open"
        title="clean the garage"
        setTasks={setTasks}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
