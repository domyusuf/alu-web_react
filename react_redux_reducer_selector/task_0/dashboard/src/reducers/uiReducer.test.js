import { SELECT_COURSE } from '../actions/courseActionTypes';
import { DISPLAY_NOTIFICATION_DRAWER } from '../actions/uiActionTypes';
import uiReducer, { initialState } from './uiReducer';

describe('uiReducer', () => {
  it('returns the initial state when no action is passed', () => {
    expect(uiReducer()).toEqual(initialState);
  });

  it('returns the initial state for an unrelated action', () => {
    expect(uiReducer(undefined, { type: SELECT_COURSE })).toEqual(initialState);
  });

  it('displays the notification drawer', () => {
    const state = uiReducer(initialState, { type: DISPLAY_NOTIFICATION_DRAWER });

    expect(state).toEqual({ ...initialState, isNotificationDrawerVisible: true });
    expect(initialState.isNotificationDrawerVisible).toBe(false);
  });
});
