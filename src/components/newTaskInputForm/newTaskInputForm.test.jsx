import renderer from "react-test-renderer";
import NewTaskInputForm from ".";

it("renders correctly", ()=> {
    const tree = renderer   
        .create(<NewTaskInputForm />)
        .toJSON();
    expect(tree).toMatchSnapshot();
})