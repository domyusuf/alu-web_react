import React from 'react';
import { shallow } from 'enzyme';
import CourseListRow from './CourseListRow';

describe('<CourseListRow />', () => {
  it('renders one cell with colspan = 2 when textSecondCell does not exist', () => {
    const wrapper = shallow(<CourseListRow isHeader={true} textFirstCell="test" />);
    expect(wrapper.find('th')).toHaveLength(1);
    expect(wrapper.find('th').prop('colSpan')).toEqual("2");
  });

  it('renders two cells when textSecondCell is present', () => {
    const wrapper = shallow(<CourseListRow isHeader={true} textFirstCell="test" textSecondCell="test2" />);
    expect(wrapper.find('th')).toHaveLength(2);
  });

  it('renders correctly two td elements within a tr element', () => {
    const wrapper = shallow(<CourseListRow isHeader={false} textFirstCell="test" textSecondCell="test2" />);
    expect(wrapper.find('tr')).toHaveLength(1);
    expect(wrapper.find('td')).toHaveLength(2);
    expect(wrapper.find('input[type="checkbox"]')).toHaveLength(1);
  });

  it('controls the checkbox and changes the selected row style', () => {
    const wrapper = shallow(<CourseListRow textFirstCell="test" textSecondCell="test2" />);
    const initialClass = wrapper.find('tr').prop('className');
    wrapper.find('input[type="checkbox"]').simulate('change', { target: { checked: true } });
    expect(wrapper.find('input[type="checkbox"]').prop('checked')).toBe(true);
    expect(wrapper.find('tr').prop('className')).not.toBe(initialClass);
  });

  it('keeps checkbox state independent between row instances', () => {
    const first = shallow(<CourseListRow textFirstCell="first" textSecondCell="one" />);
    const second = shallow(<CourseListRow textFirstCell="second" textSecondCell="two" />);
    first.find('input[type="checkbox"]').simulate('change', { target: { checked: true } });
    expect(first.find('input').prop('checked')).toBe(true);
    expect(second.find('input').prop('checked')).toBe(false);
  });
});
