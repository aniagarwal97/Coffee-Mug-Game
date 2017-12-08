import React from "react";
import { shallow } from "enzyme";
import Modal from "../Modal";

describe("<Modal />", () => {
  test("renders Hello, World!", () => {
    const wrapper = shallow(<Modal />);
    expect(wrapper.text()).toContain("Hello, World!");
  });
});
