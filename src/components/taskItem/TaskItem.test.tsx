import renderer from "react-test-renderer";
import { TaskItem } from "./TaskItem";

it("renders correctly", ()=> {
    const tree = renderer   
        .create(<TaskItem id={1} status="open" title="clean the garage" />)
        .toJSON();
    expect(tree).toMatchSnapshot();
})