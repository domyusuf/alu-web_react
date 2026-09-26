import React from 'react';
import { shallow } from 'enzyme';
import CourseList from './CourseList';
import CourseListRow from './CourseListRow';

describe('<CourseList />', () => {
  describe('With CourseList Empty', () => {
    it('renders CourseList component without crashing', () => {
      shallow(<CourseList />);
    });

    it('renders correctly if you pass an empty array or if you don\'t pass the listCourses property', () => {
      let wrapper = shallow(<CourseList />);
      expect(wrapper.find(CourseListRow).length).toBe(3); // 2 header rows + 1 "No course available yet" row

      wrapper = shallow(<CourseList listCourses={[]} />);
      expect(wrapper.find(CourseListRow).length).toBe(3);
    });
  });

  describe('With CourseList containing elements', () => {
    it('renders correctly when passed a list of courses', () => {
      const courses = [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
        { id: 3, name: 'React', credit: 40 }
      ];
      const wrapper = shallow(<CourseList listCourses={courses} />);
      expect(wrapper.find(CourseListRow).length).toBe(5); // 2 header rows + 3 course rows
    });
  });
});
