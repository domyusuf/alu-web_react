import { Map, fromJS } from 'immutable';
import {
  FETCH_COURSE_SUCCESS,
  SELECT_COURSE,
  UNSELECT_COURSE,
} from '../actions/courseActionTypes';
import { coursesNormalizer } from '../schema/courses';

export const initialState = Map();

export function courseKey(state, index) {
  return state.has(index) ? index : String(index);
}

export default function courseReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_COURSE_SUCCESS: {
      const courses = action.data.map((course) => ({ ...course, isSelected: false }));
      return state.merge(fromJS(coursesNormalizer(courses).entities.courses));
    }
    case SELECT_COURSE:
      return state.setIn([courseKey(state, action.index), 'isSelected'], true);
    case UNSELECT_COURSE:
      return state.setIn([courseKey(state, action.index), 'isSelected'], false);
    default:
      return state;
  }
}

export { courseReducer };
