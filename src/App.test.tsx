import App from "./App";
import {shallow} from "enzyme";

test("renders learn App component", () => {
    expect(shallow(<App />).length).toEqual(1);
});
