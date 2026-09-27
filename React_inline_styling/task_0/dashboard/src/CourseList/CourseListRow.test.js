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
  });

  it('uses the header background color for a header row', () => {
    const wrapper = shallow(<CourseListRow isHeader={true} textFirstCell="test" />);
    expect(wrapper.find('tr').prop('style')).toEqual({ backgroundColor: '#deb5b545' });
  });

  it('uses the default background color for a regular row', () => {
    const wrapper = shallow(<CourseListRow textFirstCell="test" />);
    expect(wrapper.find('tr').prop('style')).toEqual({ backgroundColor: '#f5f5f5ab' });
  });
});
