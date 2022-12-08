import renderer from "react-test-renderer";
import { NewTaskInputForm } from "./NewTaskInputForm";

it("renders correctly", ()=> {
    const tree = renderer   
        .create(<NewTaskInputForm />)
        .toJSON();
    expect(tree).toMatchSnapshot();
})