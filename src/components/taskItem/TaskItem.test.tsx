import renderer from "react-test-renderer";
import { TaskStatus } from "../../types/Task.types";
import { TaskItem } from "./TaskItem";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <TaskItem id={1} status={TaskStatus.OPEN} title="clean the garage" />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
