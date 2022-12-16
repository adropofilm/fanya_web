import renderer from "react-test-renderer";
import { NewTaskInputForm } from "./NewTaskInputForm";

const setTasks = jest.fn();

it("renders correctly", () => {
  const tree = renderer
    .create(<NewTaskInputForm setTasks={setTasks} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
