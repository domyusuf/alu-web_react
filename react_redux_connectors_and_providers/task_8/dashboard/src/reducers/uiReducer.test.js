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

describe('authentication actions', () => {
  it('stores the LOGIN user and clears it on LOGOUT', () => {
    const user = { email: 'student@example.com', password: 'demo' };
    const pending = uiReducer(undefined, { type: 'LOGIN', user });
    expect(pending.get('user')).toEqual(user);
    expect(pending.get('isUserLoggedIn')).toBe(false);
    const loggedIn = uiReducer(pending, { type: 'LOGIN_SUCCESS' });
    expect(loggedIn.get('isUserLoggedIn')).toBe(true);
    const loggedOut = uiReducer(loggedIn, { type: 'LOGOUT' });
    expect(loggedOut.get('user')).toBeNull();
    expect(loggedOut.get('isUserLoggedIn')).toBe(false);
    expect(loggedIn.get('user')).toEqual(user);
  });
  it('clears user details when login fails', () => {
    const state = uiReducer(undefined, { type: 'LOGIN', user: { email: 'test@example.com' } });
    expect(uiReducer(state, { type: 'LOGIN_FAILURE' }).get('user')).toBeNull();
  });
});
