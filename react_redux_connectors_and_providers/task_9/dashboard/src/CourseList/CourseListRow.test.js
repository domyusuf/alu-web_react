import React from 'react';
import { shallow } from 'enzyme';
import CourseListRow from './CourseListRow';

describe('CourseListRow', () => {
  it('renders the spanning title and two-column header', () => {
    expect(shallow(<CourseListRow isHeader textFirstCell="Courses" />).find('th').prop('colSpan')).toBe('2');
    expect(shallow(<CourseListRow isHeader textFirstCell="Name" textSecondCell="Credit" />).find('th')).toHaveLength(2);
  });
  it('uses controlled selection and reports changes without local state', () => {
    const onChangeRow = jest.fn();
    const wrapper = shallow(<CourseListRow id="1" textFirstCell="ES6" textSecondCell={60} isChecked onChangeRow={onChangeRow} />);
    expect(wrapper.find('input').prop('checked')).toBe(true);
    wrapper.find('input').simulate('change', { target: { checked: false } });
    expect(onChangeRow).toHaveBeenCalledWith('1', false);
    expect(wrapper.find('input').prop('checked')).toBe(true);
    wrapper.setProps({ isChecked: false });
    expect(wrapper.find('input').prop('checked')).toBe(false);
  });
});
