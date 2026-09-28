
import {
  LOGIN,
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from './uiActionTypes';
import {
  login,
  logout,
  displayNotificationDrawer,
  hideNotificationDrawer,
  loginSuccess,
  loginFailure,
  loginRequest,
} from './uiActionCreators';

describe('UI action creators', () => {
  it('creates a LOGIN action', () => {
    expect(login('user@example.com', 'secret')).toEqual({
      type: LOGIN,
      user: { email: 'user@example.com', password: 'secret' },
    });
  });

  it('creates a LOGOUT action', () => {
    expect(logout()).toEqual({ type: LOGOUT });
  });

  it('creates a DISPLAY_NOTIFICATION_DRAWER action', () => {
    expect(displayNotificationDrawer()).toEqual({ type: DISPLAY_NOTIFICATION_DRAWER });
  });

  it('creates a HIDE_NOTIFICATION_DRAWER action', () => {
    expect(hideNotificationDrawer()).toEqual({ type: HIDE_NOTIFICATION_DRAWER });
  });
});


describe('async UI action creators', () => {
  afterEach(() => {
    delete global.fetch;
  });

  it('creates LOGIN_SUCCESS and LOGIN_FAILURE actions', () => {
    expect(loginSuccess()).toEqual({ type: LOGIN_SUCCESS });
    expect(loginFailure()).toEqual({ type: LOGIN_FAILURE });
  });

  it('dispatches LOGIN and LOGIN_SUCCESS when the API succeeds', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ email: 'user@example.com' }),
    }));
    const dispatch = jest.fn();

    await loginRequest('user@example.com', 'secret')(dispatch);

    expect(global.fetch).toHaveBeenCalledWith('/login-success.json');
    expect(dispatch.mock.calls.map(([action]) => action.type)).toEqual([LOGIN, LOGIN_SUCCESS]);
  });

  it('dispatches LOGIN and LOGIN_FAILURE when the API fails', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));
    const dispatch = jest.fn();

    await loginRequest('user@example.com', 'secret')(dispatch);

    expect(dispatch.mock.calls.map(([action]) => action.type)).toEqual([LOGIN, LOGIN_FAILURE]);
  });
});
