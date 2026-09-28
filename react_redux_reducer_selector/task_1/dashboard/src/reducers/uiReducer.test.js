import { Map } from 'immutable';
import { SELECT_COURSE } from '../actions/courseActionTypes';
import { DISPLAY_NOTIFICATION_DRAWER } from '../actions/uiActionTypes';
import uiReducer, { initialState } from './uiReducer';

describe('uiReducer with Immutable Map', () => {
  it('returns the initial state when no action is passed', () => {
    expect(Map.isMap(uiReducer())).toBe(true);
    expect(uiReducer().toJS()).toEqual(initialState.toJS());
  });

  it('returns the initial state for an unrelated action', () => {
    expect(uiReducer(undefined, { type: SELECT_COURSE })).toBe(initialState);
  });

  it('displays the notification drawer without mutating the state', () => {
    const state = uiReducer(initialState, { type: DISPLAY_NOTIFICATION_DRAWER });

    expect(state.get('isNotificationDrawerVisible')).toBe(true);
    expect(initialState.get('isNotificationDrawerVisible')).toBe(false);
  });
});
