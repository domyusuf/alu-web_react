import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { CourseList, mapStateToProps } from './CourseList';
import CourseListRow from './CourseListRow';

describe('CourseList', () => {
  it('fetches courses on mount', () => {
    const fetchCourses = jest.fn(); shallow(<CourseList fetchCourses={fetchCourses} />);
    expect(fetchCourses).toHaveBeenCalledTimes(1);
  });
  it('dispatches select and unselect with string IDs', () => {
    const selectCourse = jest.fn(); const unSelectCourse = jest.fn();
    const wrapper = shallow(<CourseList selectCourse={selectCourse} unSelectCourse={unSelectCourse} />);
    wrapper.instance().onChangeRow('2', true); wrapper.instance().onChangeRow('2', false);
    expect(selectCourse).toHaveBeenCalledWith('2'); expect(unSelectCourse).toHaveBeenCalledWith('2');
  });
  it('renders an empty state with table headers', () => {
    const wrapper = shallow(<CourseList />);
    expect(wrapper.find('thead').find(CourseListRow)).toHaveLength(2);
    expect(wrapper.find('tbody').text()).toContain('No course available yet');
  });
  it('maps entities and renders selection from Redux', () => {
    const courses = fromJS({ '1': { id: '1', name: 'ES6', credit: 60, isSelected: true } });
    const props = mapStateToProps({ courses });
    const wrapper = shallow(<CourseList {...props} />);
    const row = wrapper.find('tbody').find(CourseListRow);
    expect(row.prop('id')).toBe('1'); expect(row.prop('isChecked')).toBe(true);
    expect(row.prop('onChangeRow')).toBe(wrapper.instance().onChangeRow);
  });
});
