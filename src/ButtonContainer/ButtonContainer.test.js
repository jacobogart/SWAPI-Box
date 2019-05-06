import React from "react";
import { shallow } from "enzyme";
import ButtonContainer from './ButtonContainer';


describe('ButtonContainer', () => {
  let mockSelectCategory = jest.fn();
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
    <ButtonContainer
      selectCategory={mockSelectCategory}
    />)
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should invoke selectCategory on click', () => {
    wrapper.find(".ButtonContainer").simulate('click');
    expect(mockSelectCategory).toHaveBeenCalled();
  })
})