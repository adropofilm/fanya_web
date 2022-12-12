import renderer from "react-test-renderer";
import { NewTaskInputForm } from "./NewTaskInputForm";

const getAllTasks = jest.fn();

it("renders correctly", () => {
  const tree = renderer
    .create(<NewTaskInputForm getAllTasks={getAllTasks} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
