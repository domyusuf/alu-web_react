import {
  FETCH_COURSE_SUCCESS,
  SELECT_COURSE,
  UNSELECT_COURSE,
} from '../actions/courseActionTypes';
import courseReducer from './courseReducer';

const courses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

const loadedCourses = courses.map((course) => ({ ...course, isSelected: false }));

describe('courseReducer', () => {
  it('returns an empty array by default', () => {
    expect(courseReducer()).toEqual([]);
  });

  it('loads courses and initializes isSelected', () => {
    expect(courseReducer(undefined, { type: FETCH_COURSE_SUCCESS, data: courses }))
      .toEqual(loadedCourses);
  });

  it('selects the course whose id matches the action index', () => {
    const result = courseReducer(loadedCourses, { type: SELECT_COURSE, index: 2 });
    expect(result[1].isSelected).toBe(true);
    expect(result[0]).toBe(loadedCourses[0]);
  });

  it('unselects the course whose id matches the action index', () => {
    const selected = loadedCourses.map((course) => (
      course.id === 2 ? { ...course, isSelected: true } : course
    ));
    const result = courseReducer(selected, { type: UNSELECT_COURSE, index: 2 });
    expect(result[1].isSelected).toBe(false);
  });
});
