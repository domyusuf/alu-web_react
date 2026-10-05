
import { SELECT_COURSE, UNSELECT_COURSE } from './courseActionTypes';

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
