import { Map } from 'immutable';
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

describe('Immutable courseReducer', () => {
  it('returns an empty Map by default', () => {
    expect(Map.isMap(courseReducer())).toBe(true);
    expect(courseReducer().size).toBe(0);
  });

  it('normalizes and loads courses', () => {
    const state = courseReducer(undefined, { type: FETCH_COURSE_SUCCESS, data: courses });
    expect(state.getIn(['2', 'name'])).toBe('Webpack');
    expect(state.getIn(['2', 'isSelected'])).toBe(false);
  });

  it('selects and unselects courses with setIn', () => {
    const loaded = courseReducer(undefined, { type: FETCH_COURSE_SUCCESS, data: courses });
    const selected = courseReducer(loaded, { type: SELECT_COURSE, index: 2 });
    const unselected = courseReducer(selected, { type: UNSELECT_COURSE, index: 2 });
    expect(selected.getIn(['2', 'isSelected'])).toBe(true);
    expect(unselected.getIn(['2', 'isSelected'])).toBe(false);
  });
});

it('selects courses whose API IDs are strings', () => {
  const state = courseReducer(undefined, { type: FETCH_COURSE_SUCCESS, data: [{ id: '1', name: 'ES6', credit: 60 }] });
  const selected = courseReducer(state, { type: SELECT_COURSE, index: '1' });
  expect(selected.getIn(['1', 'isSelected'])).toBe(true);
  expect(state.getIn(['1', 'isSelected'])).toBe(false);
  expect(courseReducer(selected, { type: UNSELECT_COURSE, index: '1' }).getIn(['1', 'isSelected'])).toBe(false);
});
