import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS } from './courseActionTypes';

export function selectCourse(index) {
  return { type: SELECT_COURSE, index };
}

export function unSelectCourse(index) {
  return { type: UNSELECT_COURSE, index };
}


import { bindActionCreators } from 'redux';

export function bindCourseActionCreators(dispatch) {
  return bindActionCreators({ selectCourse, unSelectCourse }, dispatch);
}

export function setCourses(data) { return { type: FETCH_COURSE_SUCCESS, data }; }
export function fetchCourses() {
  return dispatch => fetch('/courses.json')
    .then(response => {
      if (response.ok === false) throw new Error('Unable to load courses');
      return response.json();
    })
    .then(data => dispatch(setCourses(data)))
    .catch(() => undefined);
}
